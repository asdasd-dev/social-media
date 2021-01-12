import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { UserInfo } from '../components/UserInfo'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../app/store'
import { Article, ArticleFull, FETCH_STATUS } from '../features/types'
import { Tag } from '../components/Tag'
import { fetchArticleFullInfo, getArticleById } from '../features/articles/articlesSlice'
import { Button } from '../components/styled/Button'
import { FullWidthContent, ArticleHeader } from '../components/styled/FullWidthContent'
import { Content } from '../components/styled/Content'
import { ArticleComments } from '../components/ArticleComments'

interface ArticlePageProps {
}

const ArticlePageContainer = styled.div`

    .UserInfo {
        display: inline-block;
    }
    
    h1 {
        margin-bottom: 20px;
    }

    ${Button} {
        margin: 0 5px;
    }

    ${Content} > p {
        margin-bottom: 50px;
    }
`

const TagsContainer = styled.div`
    margin: 0 5px 30px;
`

export const ArticlePage: React.FC<ArticlePageProps> = () => {

    const { articleId } = useParams<{ articleId: string }>();

    const dispatch = useAppDispatch();

    const loadingStatus = useSelector<RootState, string>(state => state.articles.status);
    const articleBrief = useSelector<RootState, Article | null>(getArticleById(articleId));
    const [updateArticleInfo, setUpdateArticleInfo] = useState<boolean>(true);

    const [article, setArticle] = useState<Article | null>(articleBrief);
    useEffect(() => {
        let didCancel = false;
        if (updateArticleInfo) {
            dispatch(fetchArticleFullInfo({articleId}))
                .then(result => {
                    console.log(result.payload);
                    !didCancel && setArticle(result.payload as ArticleFull);
                    setUpdateArticleInfo(false);
                })
                .catch(err => console.log(err))
        }
        return () => { didCancel = true };
    }, [articleId, updateArticleInfo])

    console.log(article)

    if (!article) {
        return (
            <ArticleHeader>
                <FullWidthContent>
                    {loadingStatus === FETCH_STATUS.SUCCESS && <h1>No such article</h1>}
                    {loadingStatus === FETCH_STATUS.PENDING && <h1>Loading articles</h1>}
                    {loadingStatus === FETCH_STATUS.FAILURE && <h1>Error when fetch</h1>}
                </FullWidthContent>
            </ArticleHeader>
        );
    }


    return (
        <ArticlePageContainer>
            <ArticleHeader>
                <Content>
                    <h1>{article.title}</h1>
                    <UserInfo article={article} nameColor='white'/>
                    <Button outline size='sm'>Follow {article.author.username}</Button>
                    <Button outline size='sm'>Favorite article</Button>
                </Content>
            </ArticleHeader>
            <Content>
                <p>{article.content}</p>
                <TagsContainer>
                    {article.tags.map(tag => {
                        return <Tag key={tag} outline>{tag}</Tag>
                    })}
                </TagsContainer>
                <ArticleComments onPostComment={() => setUpdateArticleInfo(true)} 
                                 articleId={articleId} 
                                 articleComments={article.comments} />
            </Content>
        </ArticlePageContainer>
    )
}