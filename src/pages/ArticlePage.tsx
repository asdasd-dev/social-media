import React, { useEffect } from 'react'
import { ArticleHeader, Content } from '../App'
import styled from 'styled-components'
import { UserInfo } from '../components/UserInfo'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { Article } from '../features/articles/articlesSlice'
import { Tag } from '../components/Tags'

interface ArticlePageProps {
}

const ArticlePageContainer = styled.div`

    .UserInfo {
        display: inline-block;
    }
    
    h1 {
        margin-bottom: 20px;
    }

    .article-content {
        margin-bottom: 50px;
    }
`

const Button = styled.button`
    background-color: transparent;
    color: white;
    border: 1px solid white;
    border-radius: 10px;
    outline: none;
    height: 2em;
    margin: 0 5px;
    &:hover {
        cursor: pointer;
    }
`

export const ArticlePage: React.FC<ArticlePageProps> = () => {

    const { articleId } = useParams<{ articleId: string }>();
    const article = useSelector<RootState, Article | undefined>(state => state.articles.articles.find(article => article.id === Number(articleId)));

    if (!article) {
        return (
            <ArticleHeader>
                <Content>
                    <h1>No such article</h1>
                </Content>
            </ArticleHeader>
        );
    }

    return (
        <ArticlePageContainer>
            <ArticleHeader>
                <Content>
                    <h1>{article.title}</h1>
                    <UserInfo article={article} nameColor='white'/>
                    <Button>Follow {article.author}</Button>
                    <Button>Favorite article</Button>
                </Content>
            </ArticleHeader>
            <Content>
                <p className='article-content'>{article.content}</p>
                {article.tags.map(tag => {
                    return <Tag outline>{tag}</Tag>
                })}
            </Content>
        </ArticlePageContainer>
    )
}