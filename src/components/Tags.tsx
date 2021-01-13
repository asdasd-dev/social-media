import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Tag } from './Tag';

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

    const [tags, setTags] = useState<string[]>([]);
    useEffect(() => {
        let didCancel = false;
        Axios.get('http://localhost:8080/api/tags').then(result => {
            !didCancel && result.status < 300 && setTags(result.data);
        });
        return () => { didCancel = true };
    }, [])

    console.log(tags);

    return (
        <TagsContainer>
            <TagsHeader>Popular tags</TagsHeader>
            <TagsList>
                {tags.map(tag => 
                    <Tag outline={true}>{tag}</Tag>
                )}
            </TagsList>
        </TagsContainer>
    )
}