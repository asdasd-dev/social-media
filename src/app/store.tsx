import { configureStore } from '@reduxjs/toolkit'
import artilesReducer, { Article } from '../features/articles/articlesSlice'

export interface RootState {
    articles: {
      tags: string[],
      selectedTag: string | null,
      articles: Article[],
    }
}

export default configureStore({
  reducer: {
    articles: artilesReducer
  }
})