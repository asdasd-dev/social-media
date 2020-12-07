import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../app/store';
import { FETCH_STATUS, UserPublicInfo, UsersState } from './types';

const initialState: UsersState = {
    status: FETCH_STATUS.SUCCESS,
    users: []
} as UsersState;

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/users');
        return response.data as UserPublicInfo[];
    }
    catch (err) {
        return Promise.reject(err.response as string);
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, () => {
            return {
                status: FETCH_STATUS.PENDING
            }
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return {
                status: FETCH_STATUS.SUCCESS,
                users: action.payload
            }
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            return {
                status: FETCH_STATUS.FAILURE,
                reason: action.payload as string
            }
        })
    }
})

export default usersSlice.reducer;

export const getUserByUsername = (username: string) => (state: RootState) => {
    if (state.users.status === FETCH_STATUS.FAILURE) {
        return FETCH_STATUS.FAILURE;
    }
    if (state.users.status === FETCH_STATUS.PENDING) {
        return FETCH_STATUS.PENDING;
    }
    return state.users.users.find(user => user.username === username);
}

export const fetchUserPublicInfo =  async (username: string) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/user/${username}`);
        return response.data;
    }
    catch (err) {
        return Promise.reject(err.response)
    }
}