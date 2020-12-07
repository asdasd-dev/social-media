import { unwrapResult } from '@reduxjs/toolkit'
import { response } from 'express'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { useAppDispatch } from '../app/store'
import { Button } from '../components/styled/Button'
import { Input } from '../components/styled/Input'
import { signup } from '../features/userSlice'

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    

    form {
        display: flex;
        flex-flow: column;
        width: 500px;
        margin: 20px 0;

        & > * {
            margin-bottom: 20px;
        }
    }
`


interface SignUpPageProps {

}

export const SignUpPage: React.FC<SignUpPageProps> = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const dispatch = useAppDispatch();

    const handleInputFocus = () => {
        setErrorMessage(null);
        setSuccessMessage(null);
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(signup({ username, email, password }))
            .then(unwrapResult)
            .then(result => {
                setErrorMessage(null);
                setSuccessMessage(result.message);
            })
            .catch(error => {
                setSuccessMessage(null);
                setErrorMessage(error.message);
            })
    }

    return (
        <FormContainer>
            <h1>Sign up</h1>
            <p><a>Have an account?</a></p>
            <form>
                <Input type="text" name='username' placeholder='Username' 
                    onFocus={handleInputFocus} 
                    onChange={e => setUsername(e.target.value)}/>
                <Input type="text" name='email' placeholder='Email' 
                    onFocus={handleInputFocus} 
                    onChange={e => setEmail(e.target.value)}/>
                <Input type="password" name='password' placeholder='Password' 
                    onFocus={handleInputFocus} 
                    onChange={e => setPassword(e.target.value)}/>
                {successMessage}
                {errorMessage}
                <Button type="submit" onClick={handleSubmit}>
                    Sign up
                </Button>
            </form>
        </FormContainer>
    )
}