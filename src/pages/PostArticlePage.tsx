import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/styled/Button';
import { Input } from '../components/styled/Input';
import { TextArea } from '../components/styled/TextArea';
import { postArticle } from '../features/articles/articlesSlice';
import { FormContainer } from './SignUpPage';

interface PostArticlePageProps {

}

const PostArticlePageContainer = styled.div`
    
    form {
        display: flex;
        flex-flow: column;
    }
`

export const PostArticlePage: React.FC<PostArticlePageProps> = () => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [isTagsValid, setIsTagsValid] = useState(true);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleTagsChange = useCallback((e: React.ChangeEvent) => {
        const tagsArray = (e.target as HTMLInputElement).value.split(',');
        let isValid = true;
        tagsArray.forEach(tag => {
            if (!/^[0-9a-zA-Z]+$/g.test(tag)){
                isValid = false;
            }
        })
        if (isValid) {
            setTags(tagsArray);
        }
        setIsTagsValid(isValid);
    }, [])

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!isTagsValid)
            return;
            
        const body = {
            title,
            description,
            content,
            tags
        }

        dispatch(postArticle(body));

        history.push('/');
    }

    return (
        <PostArticlePageContainer>
            <FormContainer>
                <h1>Create article</h1>
                <form>
                    <Input type="text" name="title" placeholder="Title" onChange={e => setTitle(e.target.value)}/>
                    <Input type="text" name="description" placeholder="Description" onChange={e => setDescription(e.target.value)}/>
                    <TextArea as="textarea" name="content" placeholder="Content" onChange={(e: React.ChangeEvent) => setContent((e.target as HTMLTextAreaElement).value)}/>
                    <Input type="text" name="tags" placeholder="Tags (comma-separated)" onChange={handleTagsChange}/>
                    <Button type="submit" onClick={handleSubmit}>Post</Button>
                </form>
            </FormContainer>
        </PostArticlePageContainer>
    )

}