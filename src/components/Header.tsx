import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 150px;
    color: white;
    background-color: ${props => props.theme.primaryColor};
    padding: 20px;
    box-shadow: inset 0 0 10px rgba(0,0,0,.4);

    h1 {
        margin: 0;
    }
`

export const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <h1>I'm poster</h1>
            <p>A place to share your knowledge.</p>
        </HeaderContainer>
    )
}