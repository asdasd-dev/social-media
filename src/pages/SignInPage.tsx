import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react'
import { useAppDispatch } from '../app/store';
import { signin } from '../features/userSlice';
import { Input, Button, SignUpPageContainer } from './SignUpPage';


interface SignInPageProps {

}

export const SignInPage: React.FC<SignInPageProps> = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(signin({ username, password }))
            .then(unwrapResult)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <SignUpPageContainer>
            <h1>Sign in</h1>
            <p><a>Need an account?</a></p>
            <form>
                <Input type="text" name='username' placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                <Input type="password" name='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                <Button type="submit" 
                    onClick={handleSubmit}>
                    Sign in
                </Button>
            </form>
        </SignUpPageContainer>
    )
}