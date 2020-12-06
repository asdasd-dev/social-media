import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../app/store';

const TagsContainer = styled.div`
    display: flex;
    flex-flow: column;
`

export const Tag = styled.a<{ outline?: boolean }>`
    font-size: .75em;
    margin: 0 5px 5px 0;
    background-color: ${props => !props.outline && props.theme.primaryColor};
    border: ${props => props.outline && `1px solid ${props.theme.primaryColor}`};
    color: ${props => !props.outline && 'white'};
    border-radius: 10px;
    padding: 5px;

    &:hover {
        cursor: pointer;
    }
`

const TagsHeader = styled.p`
    margin: 0 0 10px;
`

const TagsList = styled.div`
    display: flex;
    flex-flow: row wrap;
`

interface TagsProps {
    onTagSelect: (tagName: string) => void,
}

export const Tags: React.FC<TagsProps> = ({ onTagSelect }) => {

    return (
        <TagsContainer>
            <TagsHeader>Popular tags</TagsHeader>
            <TagsList>
                TODO API
            </TagsList>
        </TagsContainer>
    )
}