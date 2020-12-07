import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import artilesReducer from '../features/articles/articlesSlice'
import userReducer from '../features/userSlice'
import usersReducer from '../features/usersSlice'


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