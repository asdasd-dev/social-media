import { EnhancedStore } from '@reduxjs/toolkit';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../app/store';
import { Article } from '../features/articles/articlesSlice'

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

export const Feed: React.FC = () => {
    
    const selectedTag = useSelector<RootState, string | null>(state => state.articles.selectedTag);
    const articles = useSelector<RootState, Article[]>(state => state.articles.articles);

    let articlesList = articles;

    if (selectedTag) {
        articlesList = articles.filter(article => article.tags.includes(selectedTag))
    }

    return (
        <FeedContainer>
            <FeedTags>
                <TagLink selected={!Boolean(selectedTag)}>Global Feed</TagLink>
                {selectedTag && 
                <TagLink selected>{selectedTag}</TagLink>}
            </FeedTags>
            {articlesList.map(article => 
                <div>
                    <pre>{JSON.stringify(article, null, 2)}</pre>
                </div>
            )}
        </FeedContainer>
    )
}