import React, { useState } from 'react'
import { Input, Button, SignUpPageContainer } from './SignUpPage';


interface SignInPageProps {

}

export const SignInPage: React.FC<SignInPageProps> = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SignUpPageContainer>
            <h1>Sign in</h1>
            <p><a>Need an account?</a></p>
            <form>
                <Input type="text" name='username' placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                <Input type="password" name='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                <Button type="submit" onClick={e => e.preventDefault()}>Sign in</Button>
            </form>
        </SignUpPageContainer>
    )
}