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
    box-shadow: 0 1px 0 ${props.theme.primaryColor};
    `}
`

export const Feed: React.FC = () => {
    
    const articlesObject = useSelector<RootState, ArticlesState>(getArticles());
    const userObject = useSelector<RootState, UserState>(getUser());

    const {username, tagname} = useParams<{username?: string, tagname?:string}>();
    const history = useHistory();

    console.log('tagname: ', tagname);

    const [articlesList, setArticlesList] = useState<Article[]>([]);

    const [selectedTab, setSelectedTab] = useState<'userArticles' | 'yourFeed' | 'global' | 'tag'>(tagname ? 'tag' : username ? 'userArticles' : 'global');
    useEffect(() => {
        if (articlesObject.status === FETCH_STATUS.SUCCESS) {
            if (selectedTab === 'global') {
                setArticlesList(articlesObject.articles);
            }
            else if (userObject.status !== USER_STATUS.GUEST && selectedTab === 'yourFeed') {
                setArticlesList(articlesObject.articles.filter(article => article.author.username === userObject.user.username));
            }
            else if (selectedTab === 'userArticles') {
                setArticlesList(articlesObject.articles.filter(article => article.author.username === username));
            }
            else if (selectedTab === 'tag' && tagname) {
                setArticlesList(articlesObject.articles.filter(article => article.tags.includes(tagname)));
            }
        }
    }, [selectedTab, articlesObject])

    const onGlobalClick = () => {
        history.push('/');
        setSelectedTab('global');
    }

    const onYourFeedClick = () => {
        history.push('/');
        setSelectedTab('yourFeed');
    }

    const onUserArticlesTabClick = () => {
        setSelectedTab('userArticles')
    }

    let feedOptions = [];

    if (username) {
        feedOptions = [
            <TagLink selected={selectedTab === 'userArticles'} onClick={onUserArticlesTabClick}>Articles</TagLink>
        ]
    }
    else {
        feedOptions = [
            <TagLink selected={selectedTab === 'global'} onClick={onGlobalClick}>Global feed</TagLink>
        ]
        if (userObject.status !== USER_STATUS.GUEST) {
            feedOptions.unshift(
                <TagLink selected={selectedTab === 'yourFeed'} onClick={onYourFeedClick}>Your feed</TagLink>
            )
        }
        if (tagname) {
            feedOptions.push(
                <TagLink selected={selectedTab === 'tag'}>{tagname}</TagLink>
            )
        }
    }

    return (
        <FeedContainer>
            <FeedTags>
                {feedOptions}
            </FeedTags>
            {articlesList.map(article => 
                <FeedCard article={article} />
            )}
        </FeedContainer>
    )
}