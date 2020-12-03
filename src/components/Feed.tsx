import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../app/store';
import { Article } from '../features/articles/articlesSlice'
import { User } from '../features/userSlice';
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
    
    const articles = useSelector<RootState, Article[]>(state => state.articles.articles);
    const user = useSelector<RootState, User>(state => state.user);

    const [articlesList, setArticlesList] = useState(articles);
    const [selectedTab, setSelectedTab] = useState<'global' | 'user' | 'tag'>('global')

    useEffect(() => {
        if (selectedTag) {
            setArticlesList(articles.filter(article => article.tags.includes(selectedTag)))
            setSelectedTab('tag');
        }
    }, [selectedTag])

    const onGlobalClick = () => {
        removeTag();
        setArticlesList(articles);
        setSelectedTab('global'); 
    }

    const onYourFeedClick = () => {
        removeTag();
        setArticlesList(articles.filter(article => article.author === user.login));
        setSelectedTab('user');
    }

    return (
        <FeedContainer>
            <FeedTags>
                { user.type === 'authenticated' && 
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