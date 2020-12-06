import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { response } from 'express';
import { act } from 'react-dom/test-utils';
import { RootState } from '../../app/store';
import { fetchUsers } from '../usersSlice';

export interface Article {
    _id: string,
    author: { username: string, avatar: string },
    date: Date,
    title: string,
    description: string,
    content: string,
    tags: { name: string }[]
}

export interface ArticlesState {
    tags?: string[],
    status: 'idle' | 'loading'
    articles: Article[],
}

export const postArticle = createAsyncThunk(
    'articles/post',
    async (data: {title: string, description: string, content: string, tags: string[]}, thunkApi) => {
        try {
            const response = await axios.post('http://localhost:8080/api/article', data);
            thunkApi.dispatch(fetchArticles());
            return response.data;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response.data);
        }
    }
)

export const fetchArticles = createAsyncThunk(
    'articles/fetchArticles',
    async () => {
        const response = await axios.get('http://localhost:8080/api/articles');
        return response.data;
    }
)

const initialState: ArticlesState = {
    status: 'idle',
    articles: []
}

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(postArticle.fulfilled, (state, action) => {
            console.log(action.payload.message);
        });
        builder.addCase(fetchArticles.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchArticles.fulfilled, (state, action) => {
            if (action.payload) {
                state.articles = action.payload;
            }
            state.status = 'idle';
        });
        builder.addCase(fetchArticles.rejected, (state) => {
            state.status = 'idle';
        })
    }
    
})

export const getArticle = (state: RootState, articleId: string) => {
    return state.articles.articles.find(article => article._id === articleId) || null;
}

export default articlesSlice.reducer;