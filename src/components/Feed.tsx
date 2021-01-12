import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../app/store';
import { getArticles } from '../features/articles/articlesSlice'
import { ArticlesState, FETCH_STATUS, Article, UserState, USER_STATUS } from '../features/types';
import { getUser } from '../features/userSlice';
import { tag } from '../server/models';
import { FeedCard } from './FeedCard';

const FeedContainer = styled.div`
`
const FeedTags = styled.div`
    border-bottom: 1px solid grey;
    height: 30px;
    display: flex;
    flex-flow: row nowrap;
`

const TagLink = styled.a<{selected?: boolean}>`
    padding: 0 20px;
    &:hover {
        color: black;
        cursor: pointer;
    }
    ${props => props.selected && `
    color: ${props.theme.primaryColor};
    box-shadow: 0 2px 0 ${props.theme.primaryColor};
    `}
`

// feedLinks - map with tab name and function filtering articles
// firstSelected - name of initially selected tab
interface FeedProps {
    feedLinks: Map<string, (articles: Article[]) => Article[]>;
    firstSelected: string;
}

export const Feed: React.FC<FeedProps> = ({ feedLinks, firstSelected }) => {
    
    const articlesObject = useSelector<RootState, ArticlesState>(getArticles());

    const [selectedTab, setSelectedTab] = useState<string>();
    const [articlesList, setArticlesList] = useState<Article[]>([]);

    useEffect(() => {
        const fistSelectedGetArticles = feedLinks.get(firstSelected);
        if (articlesObject.status === FETCH_STATUS.SUCCESS && fistSelectedGetArticles) {
            setSelectedTab(firstSelected)
            setArticlesList(fistSelectedGetArticles(articlesObject.articles));
        }
    }, [feedLinks, firstSelected, articlesObject])

    if (articlesObject.status === FETCH_STATUS.PENDING) {
        return <div>Loading articles</div>
    }

    if (articlesObject.status === FETCH_STATUS.FAILURE) {
        return <div>Fetch articles error</div>
    }

    return (
        <FeedContainer>
            <FeedTags>
                {Array.from(feedLinks).map(([link, getArticles]) => {
                    return (
                        <TagLink selected={selectedTab === link} 
                                onClick={() => {
                                    setSelectedTab(link);
                                    setArticlesList(getArticles(articlesObject.articles));
                                }}>
                            {link}
                        </TagLink>
                    )
                })}
            </FeedTags>
            {articlesList.map(article => 
                <FeedCard article={article} />
            )}
        </FeedContainer>
    )
}