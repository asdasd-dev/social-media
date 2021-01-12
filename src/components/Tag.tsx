import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const TagContainer = styled.a<{ outline?: boolean }>`
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

interface TagProps {
    outline: boolean;
}

export const Tag: React.FC<TagProps> = ({ children, outline }) => {

    const history = useHistory();

    return (
        <TagContainer outline={outline} onClick={() => history.push(`/tag/${children}`)}>
            {children}
        </TagContainer>
    )
}