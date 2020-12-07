import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../app/store';
import { USER_STATUS } from '../features/types';
import { logout } from '../features/userSlice';
import { Content } from './styled/Content';

const NavContainer = styled(Content)`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 70px;
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

    const userStatus = useSelector<RootState, USER_STATUS>(state => state.user.status)

    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogoutClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(logout());
        history.push('/');
    } 

    return (
        <NavContainer>
            <Logo onClick={() => history.push('/')}>I'm poster</Logo>
            <Links>
                <NavLink to='/'>Home</NavLink>
                {userStatus === USER_STATUS.GUEST &&
                <>
                    <NavLink to='/signin'>Sign in</NavLink>
                    <NavLink to='/signup'>Sign up</NavLink>
                </>
                }
                {userStatus === USER_STATUS.USER &&
                    <>
                        <NavLink to='/create-article' >Post article</NavLink>
                        <NavLink to='/settings'>Settings</NavLink>
                        <NavLink to='/home' onClick={handleLogoutClick}>Logout</NavLink>
                    </>
                }
                {userStatus === USER_STATUS.ADMIN &&
                    <>
                        <NavLink to='/create-article' >Post article</NavLink>
                        <NavLink to='/settings'>Settings</NavLink>
                        <NavLink to='/home' onClick={handleLogoutClick}>Logout</NavLink>
                    </>
                }
            </Links>
        </NavContainer>
    )
}