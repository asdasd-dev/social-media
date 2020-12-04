import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export interface User {
    type: 'guest' | 'authenticated' | 'admin',
    login?: string,
}

interface SignupData {
    username: string;
    email: string;
    password: string;
}

export const signup = createAsyncThunk(
    'user/signup', 
    async (data: SignupData) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', data);
            return response.data;
        }
        catch (err) {
            return err.response.data;
        }
    })

export const signin = createAsyncThunk(
    'user/signin',
    async (data: {username: string, password: string}) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', data);
            localStorage.setItem('token', response.data.accessToken);

            // send x-access-token with all requests
            axios.interceptors.request.use(function (config) {
                config.headers['x-access-token'] = response.data.accessToken;
                return config;
            }, function (error) {
                return Promise.reject(error);
            });

            return response.data;
        }
        catch (err) {
            return err.response.data;
        }
    }
)

const initialState: User = {
    type: 'guest'
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: {
    }
})

export default userSlice.reducer;