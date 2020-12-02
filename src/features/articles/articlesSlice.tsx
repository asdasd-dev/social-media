import { createSlice } from '@reduxjs/toolkit'

export interface Article {
    author: string,
    date: string,
    title: string,
    content: string,
    tags: string[]
}

const initialState: any = {
    tags: ['firstT', 'sectondT', 'thirdT', 'fourthT', 'fifthT'],
    selectedTag: null,
    articles: [
        { author: 'Asd', date: '2012-05-05', title: 'Title1', content: 'Content1', tags: ['firstT', 'secondT'] },
        { author: 'Bsd', date: '2012-05-06', title: 'Title2', content: 'Content2', tags: ['firstT'] },
        { author: 'Csd', date: '2012-05-07', title: 'Title3', content: 'Content3', tags: ['secondT'] }
    ]
}

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {

    }
})

export default articlesSlice.reducer;