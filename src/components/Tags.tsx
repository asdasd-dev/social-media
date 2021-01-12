import React from 'react';
import styled from 'styled-components';

const TagsContainer = styled.div`
    display: flex;
    flex-flow: column;
`

const TagsHeader = styled.p`
    margin: 0 0 10px;
`

const TagsList = styled.div`
    display: flex;
    flex-flow: row wrap;
`

export const Tags: React.FC = () => {

    return (
        <TagsContainer>
            <TagsHeader>Popular tags</TagsHeader>
            <TagsList>
                TODO API
            </TagsList>
        </TagsContainer>
    )
}