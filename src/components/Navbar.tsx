import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    max-width: 1000px;
    margin: auto;
    padding: 0 20px;


    *:not(:first-child) {
        margin-left: 50px;
    }
`

const Logo = styled.div `
    font-size: 1.25em;
    font-weight: 600;
    color: ${props => props.theme.primaryColor};
`

const Links = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`

const NavLink = styled.a`
    text-decoration: none;
    color: inherit;
`

export const Navbar: React.FC = () => {
    return (
        <NavContainer>
            <Logo>I'm poster</Logo>
            <Links>
                <NavLink href="#">Home</NavLink>
                <NavLink href="#">Sign in</NavLink>
                <NavLink href="#">Sign up</NavLink>
            </Links>
        </NavContainer>
    )
}