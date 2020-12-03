import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { RootState } from '../app/store';
import { Article } from '../features/articles/articlesSlice';
import { Tag } from './Tags'
import { UserInfo } from './UserInfo';

styled.img`
    width: 10px
`

const FeedCardContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    margin: 20px 0;
    
    &:not(:last-child) {
        border-bottom: 1px solid lightgray;
    }

    .read-more-link {

    }
`

export const ArticleInfo = styled.div`
    display: inline-block;
    vertical-align: middle;
`

const ArticleContent = styled.div`
    margin-bottom: 20px;

    h1 {
        margin: 0 0 5px;
        color: black;
    }

    p {
        margin: 0;
    }
`

const FeedCardFooter = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 20px;
    a {
        font-size: .75em;
    }
`

const ReadMoreLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`

interface FeedCardProps {
    article: Article,
} 

export const FeedCard: React.FC<FeedCardProps> = ({ article }) => {

    return (
        <FeedCardContainer>
            <UserInfo article={article}/>
            <ArticleContent>
                <h1>{article.title}</h1>
                <p>{article.content.substr(0, 100)}</p>
            </ArticleContent>
            <FeedCardFooter>
                <ReadMoreLink to={`/article/${article.id}`} >Read more...</ReadMoreLink>
                <div>
                    {article.tags.map(tag => {
                        return <Tag outline>{tag}</Tag>
                    })}
                </div>
            </FeedCardFooter>
        </FeedCardContainer>
    );
}