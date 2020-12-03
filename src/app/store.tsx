import { configureStore } from '@reduxjs/toolkit'
import artilesReducer, { Article, ArticlesState } from '../features/articles/articlesSlice'
import userReducer, { User } from '../features/userSlice'
import usersReducer, { UserPublicInfo } from '../features/usersSlice'

export interface RootState {
    articles: ArticlesState,
    user: User,
    users: UserPublicInfo[],
}

export default configureStore({
  reducer: {
    articles: artilesReducer,
    user: userReducer,
    users: usersReducer
  }
})