import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { sortAndDeduplicateDiagnostics } from 'typescript'
import artilesReducer, { Article, ArticlesState } from '../features/articles/articlesSlice'
import userReducer, { User } from '../features/userSlice'
import usersReducer, { UserPublicInfo } from '../features/usersSlice'


const store = configureStore({
  reducer: {
    articles: artilesReducer,
    user: userReducer,
    users: usersReducer
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()