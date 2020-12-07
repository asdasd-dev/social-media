import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Content } from '../App';
import { UserUpdateRequest, USER_STATUS } from '../features/types';
import { getUser, updateUser } from '../features/userSlice';
import { Button, FormContainer, Input } from './SignUpPage';
import { TextArea } from './PostArticlePage'
import axios from 'axios';
import { user } from '../server/models';
import { useAppDispatch } from '../app/store';

interface UserSettingsPageProps {

}

const UserSettingsPageContainer = styled.div`

`

export const UserSettingsPage: React.FC<UserSettingsPageProps> = () => {

    const userObject = useSelector(getUser());

    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [about, setAbout] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (userObject.status !== USER_STATUS.GUEST) {
            setEmail(userObject.user.email);
            setAvatar(userObject.user.avatar)
            setAbout(userObject.user.about)
        }
    }, [])

    if (userObject.status === USER_STATUS.GUEST) {
        return (
            <Content>
                You have to sign in to be able to view this page!
            </Content>
        )
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        const updateInfo: UserUpdateRequest = {};
        if (email !== '' && email !== userObject.user.email) {
            updateInfo.email = email;
        }
        if (avatar !== '' && avatar !== userObject.user.avatar) {
            updateInfo.avatar = avatar;
        }
        if (about !== '' && about !== userObject.user.about) {
            updateInfo.about = about;
        }
        if (password !== '') {
            updateInfo.password = password;
        }
        dispatch(updateUser(updateInfo));
    }

    return (
        <FormContainer>
            <h1>Your settings</h1> 
            <form>
                <p>Username: {userObject.user.username}</p>
                <Input type="text" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                <Input type="text" name="avatar" placeholder="Avatar url" value={avatar} onChange={e => setAvatar(e.target.value)}/>
                <TextArea as="textarea" name="about" placeholder="Your 'about' information" value={about} onChange={(e: React.ChangeEvent) => setAbout((e.target as HTMLTextAreaElement).value)}/>
                <Input type="passoword" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <Button type="submit" onClick={handleSubmit}>Commit changes</Button>
            </form>
        </FormContainer>
    )
}