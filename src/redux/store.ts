import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import genreSlice from './slicesReducers/genresSlice';
import movieSlice from './slicesReducers/movieSlice';
import recommendationsSlice from './slicesReducers/recommendationsSlice';
import detailsSlice from './slicesReducers/detailsSlice';
import userSlice from './slicesReducers/userSlice';

export const store = configureStore({
  reducer: {
    genreSlice, 
    movieSlice,
    recommendationsSlice,
    detailsSlice,
    userSlice,
  },
})
 
export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch 
export type AppThunk = ThunkAction<void, RootState, unknown, Action>