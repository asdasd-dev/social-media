import { createSlice } from '@reduxjs/toolkit'

export interface UserPublicInfo {
    login: string,
    avatar: string
}

const initialState: UserPublicInfo[] = [
    {
        login: 'Asd',
        avatar: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/123907218/original/fccdc48c5d7e319ae32d19898d11182290c3021d/create-cyberpunk-and-superhero-style-illustration-for-you.jpg',
    },
    {
        login: 'Bsd',
        avatar: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/123907218/original/fccdc48c5d7e319ae32d19898d11182290c3021d/create-cyberpunk-and-superhero-style-illustration-for-you.jpg',
    },
    {
        login: 'Csd',
        avatar: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/123907218/original/fccdc48c5d7e319ae32d19898d11182290c3021d/create-cyberpunk-and-superhero-style-illustration-for-you.jpg',
    }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    }
})

export default usersSlice.reducer;