import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import genreSlice from './slicesReducers/genresSlice'

export const store = configureStore({
  reducer: {
   genreSlice, 
  },
})
 
export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch 
export type AppThunk = ThunkAction<void, RootState, unknown, Action>