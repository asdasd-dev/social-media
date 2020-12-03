import React, { useState } from 'react'
import styled, { css } from 'styled-components'

export const SignUpPageContainer = styled.div`
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

const inputStyle = css`
    font-size: 1.25em;
    height: 40px;
    padding: 0 20px;
    font-family: inherit;
    border-radius: 10px;
    outline: none;
`

export const Input = styled.input`
    ${inputStyle}
    border: 1px solid lightgray;
    color: inherit;
`

export const Button = styled.button`
    ${inputStyle}
    background-color: ${props => props.theme.primaryColor};
    color: white;
    border: none;
    margin-top: 20px;

    &:hover{
        cursor: pointer;
    }
`


interface SignUpPageProps {

}

export const SignUpPage: React.FC<SignUpPageProps> = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SignUpPageContainer>
            <h1>Sign up</h1>
            <p><a>Have an account?</a></p>
            <form>
                <Input type="text" name='username' placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                <Input type="text" name='email' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                <Input type="password" name='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                <Button type="submit" onClick={e => e.preventDefault()}>Sign up</Button>
            </form>
        </SignUpPageContainer>
    )
}