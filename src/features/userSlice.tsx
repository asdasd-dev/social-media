import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { user } from '../server/models';
import usersSlice from './usersSlice';


export interface UserState {
    status: UserStatus,
    user?: User
}

export type User = {
    id: string,
    username: string,
    email: string,
    avatar: string,
    accessToken:string,
    roles: string[]
}

export type UserStatus = 'guest' | 'user' | 'admin';

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
    async (data: {username: string, password: string}, thunkApi) => {

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signin', data);

            localStorage.setItem('user', JSON.stringify(response.data));

            // send x-access-token with all requests
            axios.interceptors.request.use(config => {
                config.headers['x-access-token'] = response.data.accessToken;
                return config;
            }, error => {
                return Promise.reject(error);
            });

            return response.data;
        }
        catch (err) {
            const response = err.response;

            if (response.status >= 400 && response.status <= 500) {
                return thunkApi.rejectWithValue(response.data);
            }
        }
    }
)

const initialState: UserState = {
    status: 'guest'
}

let localStorageUser = localStorage.getItem('user');

if (localStorageUser) {
    let userObject = JSON.parse(localStorageUser);
    initialState.user = userObject as User;
    initialState.status = initialState.user.roles.includes('ROLE_ADMIN') ? 'admin' : 'user';
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: state => {
            state.status = 'guest';
            localStorage.removeItem('user');
            delete state.user;
        }
    },
    extraReducers: builder => {
        builder.addCase(signin.fulfilled, (state, action) => {
            state.status = action.payload.roles.includes('ROLE_ADMIN') ? 'admin' : 'user'
            state.user = action.payload;
        })
    }
})

export default userSlice.reducer;

export const { logout } = userSlice.actions; 