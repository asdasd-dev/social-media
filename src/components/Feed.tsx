import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../app/store';
import { getArticles } from '../features/articles/articlesSlice'
import { ArticlesState, FETCH_STATUS, Article, UserState, USER_STATUS } from '../features/types';
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
    border-bottom: 1px solid ${props.theme.primaryColor};
    `}
`
interface FeedProps {
    selectedTag?: string,
    removeTag: () => void
}

export const Feed: React.FC<FeedProps> = ({ selectedTag, removeTag }) => {
    
    const articlesObject = useSelector<RootState, ArticlesState>(getArticles());
    const userObject = useSelector<RootState, UserState>(state => state.user);

    const [articlesList, setArticlesList] = useState<Article[]>([]);

    useEffect(() => {
        if (articlesObject.status === FETCH_STATUS.SUCCESS) {
            setArticlesList(articlesObject.articles)
        }
    }, [articlesObject])


    const [selectedTab, setSelectedTab] = useState<'global' | 'user' | 'tag'>('global')

    console.log('Articles when fetch: ', articlesList);

    useEffect(() => {
        if (selectedTag && articlesObject.status === FETCH_STATUS.SUCCESS) {
            setArticlesList(articlesObject.articles.filter(article => article.tags.includes(selectedTag)))
            setSelectedTab('tag');
        }
    }, [selectedTag])

    const onGlobalClick = () => {
        removeTag();
        if (articlesObject.status === FETCH_STATUS.SUCCESS) {
            setArticlesList(articlesObject.articles);
        }
        else {
            setArticlesList([]);
        }
        setSelectedTab('global'); 
    }

    const onYourFeedClick = () => {
        removeTag();
        if (articlesObject.status === FETCH_STATUS.SUCCESS && userObject.status !== USER_STATUS.GUEST) {
            setArticlesList(articlesObject.articles.filter(article => article.author.username === userObject.user.username));
        }
        setSelectedTab('user');
    }

    return (
        <FeedContainer>
            <FeedTags>
                { userObject.status !== USER_STATUS.GUEST && 
                <TagLink selected={selectedTab === 'user'} onClick={() => onYourFeedClick()}>Your&nbsp;Feed</TagLink>
                }
                <TagLink selected={selectedTab === 'global'} onClick={() => onGlobalClick()}>Global&nbsp;Feed</TagLink>
                {selectedTag && 
                <TagLink selected={selectedTab === 'tag'}>{selectedTag}</TagLink>}
            </FeedTags>
            {articlesList.map(article => 
                <FeedCard article={article} />
            )}
        </FeedContainer>
    )
}