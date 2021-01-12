import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../app/store';
import { article } from '../../server/models';
import { ArticlesState, FETCH_STATUS, Article, ArticleFull } from '../types';

export const postArticle = createAsyncThunk(
    'articles/post',
    async (data: {title: string, description: string, content: string, tags: string[]}, thunkApi) => {
        try {
            const response = await axios.post('http://localhost:8080/api/articles', data);
            thunkApi.dispatch(fetchArticles());
            return response.data;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response.data.message);
        }
    }
)

export const postComment = createAsyncThunk(
    'articles/postComment',
    async (data: {text: string, articleId: string}, thunkApi) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/articles/${data.articleId}/comment`, 
                                                {text: data.text});
            return response.data;
        }
        catch (err) {
            console.log(err);
            return Promise.reject(err);
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

export const fetchArticleFullInfo = createAsyncThunk(
    'articles/fetchArticle',
    async (data: {articleId: string}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/articles/${data.articleId}`);
            return response.data as ArticleFull;
        }
        catch (err) {
            console.log(err);
            return Promise.reject(err);
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
        builder.addCase(postComment.fulfilled, (state, action) => {
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