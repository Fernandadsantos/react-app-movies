import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import genreSlice from './slicesReducers/genresSlice';
import movieSlice from './slicesReducers/movieSlice';
import recommendationsSlice from './slicesReducers/recommendations';
import detailsSlice from './slicesReducers/detailsSlice';

export const store = configureStore({
  reducer: {
   genreSlice, 
   movieSlice,
   recommendationsSlice,
   detailsSlice,
  },
})
 
export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch 
export type AppThunk = ThunkAction<void, RootState, unknown, Action>