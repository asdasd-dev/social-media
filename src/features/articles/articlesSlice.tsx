import { createSlice } from '@reduxjs/toolkit'

export interface Article {
    id: number,
    author: string,
    date: string,
    title: string,
    content: string,
    tags: string[]
}

export interface ArticlesState {
    tags: string[],
    articles: Article[],
}

const initialState: ArticlesState = {
    tags: ['firstT', 'secondT', 'thirdT', 'fourthT', 'fifthT'],
    articles: [
        { id: 1, author: 'Asd', date: '2012-05-05', title: 'Title1', content: 'Content1 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio repellat voluptates sapiente ducimus, accusamus alias repudiandae dicta a quam! Necessitatibus magnam suscipit, totam vitae odit molestias dolore vel nam culpa.', 
        tags: ['firstT', 'secondT'] },
        { id: 2, author: 'Bsd', date: '2012-05-06', title: 'Title2', content: 'Content2 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio repellat voluptates sapiente ducimus, accusamus alias repudiandae dicta a quam! Necessitatibus magnam suscipit, totam vitae odit molestias dolore vel nam culpa.', 
        tags: ['firstT'] },
        { id: 3, author: 'Csd', date: '2012-05-07', title: 'Title3', content: 'Content3 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio repellat voluptates sapiente ducimus, accusamus alias repudiandae dicta a quam! Necessitatibus magnam suscipit, totam vitae odit molestias dolore vel nam culpa.', 
        tags: ['secondT'] }
    ]
}

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
    }
})

export default articlesSlice.reducer;