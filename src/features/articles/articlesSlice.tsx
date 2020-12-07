import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, {  AxiosResponse } from 'axios'
import e from 'express';
import { RootState } from '../../app/store';
import { ArticlesState, FETCH_STATUS, Article } from '../types';

export const postArticle = createAsyncThunk(
    'articles/post',
    async (data: {title: string, description: string, content: string, tags: string[]}, thunkApi) => {
        try {
            const response = await axios.post('http://localhost:8080/api/article', data);
            thunkApi.dispatch(fetchArticles());
            return response.data;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response.data.message);
        }
    }
)

export const fetchArticles = createAsyncThunk(
    'articles/fetchArticles',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8080/api/articles');
            return response.data as Article[];
        }
        catch (err) {
            console.log(err);
            return Promise.reject(err.response.data.message);
        }
    }
)

const initialState: ArticlesState = {
    status: FETCH_STATUS.SUCCESS,
    articles: []
} as ArticlesState

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(postArticle.fulfilled, (state, action) => {
            console.log(action.payload.message);
        });
        builder.addCase(fetchArticles.pending, () => {
            return {
                status: FETCH_STATUS.PENDING
            }
        });
        builder.addCase(fetchArticles.fulfilled, (state, action) => {
            return {
                status: FETCH_STATUS.SUCCESS,
                articles: action.payload || []
            }
        });
        builder.addCase(fetchArticles.rejected, (state, action) => {
            return {
                status: FETCH_STATUS.FAILURE,
                reason: action.payload as string
            }
        })
    }
    
})

export const getArticleById = (articleId: string) => (state: RootState) => {
    if (state.articles.status === FETCH_STATUS.SUCCESS) {
        const foundArticle = state.articles.articles.find(article => article.id === articleId);
        if (foundArticle) {
            return foundArticle;
        }
    }
    return null;
}

export const getArticles = () => (state: RootState) => {
    return state.articles;
}

export default articlesSlice.reducer;