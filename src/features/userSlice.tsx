import { createSlice } from '@reduxjs/toolkit'

export interface User {
    type: 'guest' | 'authenticated' | 'admin',
    login?: string,
}

const initialState: User = {
    type: 'guest',
    login: 'Asd',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    }
})

//export const { selectTag } = articlesSlice.actions;

export default userSlice.reducer;