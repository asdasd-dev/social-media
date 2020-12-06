import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export interface UserPublicInfo {
    login: string,
    avatar: string
}

const initialState: UserPublicInfo[] = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('http://localhost:8080/api/users');
    return response.data;
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchUsers.fulfilled, (state, action) =>  action.payload)
    }
})

export default usersSlice.reducer;