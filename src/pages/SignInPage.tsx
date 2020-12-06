import { unwrapResult } from '@reduxjs/toolkit';
import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../app/store';
import { signin } from '../features/userSlice';
import { Input, Button, FormContainer } from './SignUpPage';


interface SignInPageProps {

}

export const SignInPage: React.FC<SignInPageProps> = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const errorMessage = useRef<string>('');

    const dispatch = useAppDispatch();
    const history = useHistory();
    

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(signin({ username, password }))
            .then(unwrapResult)
            .then(result => {
                console.log(result);
                history.push('/');
            })
            .catch(error => {
                errorMessage.current = error.message;
                setIsError(true);
            })
    }

    const handleInputFocus = (e: React.SyntheticEvent) => {
        setIsError(false);
    }

    return (
        <FormContainer>
            <h1>Sign in</h1>
            <p><a>Need an account?</a></p>
            <form>
                <Input type="text" name='username' placeholder='Username' onFocus={handleInputFocus} onChange={e => setUsername(e.target.value)}/>
                <Input type="password" name='password' placeholder='Password' onFocus={handleInputFocus} onChange={e => setPassword(e.target.value)}/>
                {isError && <p>{errorMessage.current}</p>}
                <Button type="submit" 
                    onClick={handleSubmit}>
                    Sign in
                </Button>
            </form>
        </FormContainer>
    )
}