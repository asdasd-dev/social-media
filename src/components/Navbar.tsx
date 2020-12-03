import React from 'react';
import { Link, useHistory } from 'react-router-dom';
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
    cursor: pointer;
`

const Links = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`

const NavLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`

export const Navbar: React.FC = () => {

    const history = useHistory();

    return (
        <NavContainer>
            <Logo onClick={() => history.push('/')}>I'm poster</Logo>
            <Links>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/signin'>Sign in</NavLink>
                <NavLink to='/signup'>Sign up</NavLink>
            </Links>
        </NavContainer>
    )
}