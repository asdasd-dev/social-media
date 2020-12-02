import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../app/store';

const TagsContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
`

const Tag = styled.a`
    font-size: .75em;
    margin: 0 5px 5px 0;
    background-color: ${props => props.theme.primaryColor};
    border-radius: 10px;
    padding: 5px;
    color: white;
`

const TagsHeader = styled.p`
    margin: 0 0 10px;
`

export const Tags: React.FC = () => {

    const tags = useSelector<RootState, string[]>(state => state.articles.tags);

    return (
        <>
            <TagsHeader>Popular tags</TagsHeader>
            <TagsContainer>
                {tags.map(tag => 
                    <Tag>{tag}</Tag>
                )}
            </TagsContainer>
        </>
    )
}