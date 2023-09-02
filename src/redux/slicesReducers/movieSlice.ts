import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import { Movie } from "../../interfaces";

export const fetchMovie = createAsyncThunk(
    'movie/fetchMovie',
    async () => {
        const { data: { results } } = await api
      .get("/movie/popular?api_key=1abb3e68d878be1155d781ce812f80a8&language=pt-BR")

      return results;
    }
)

interface MovieState {
    movie: Movie[];
    loadingMovie: string;
}

const initialState: MovieState = {
    movie: [],
    loadingMovie: 'idle',
}

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchMovie.fulfilled, (state, action) => {
            state.movie = action.payload as Movie[];
            state.loadingMovie = 'succeeded';
        })

        .addCase(fetchMovie.pending, (state) => {
            state.movie =  [] ;
            state.loadingMovie = 'pending';
        })

        .addCase(fetchMovie.rejected, (state ) => {
            state.movie =  [];
            state.loadingMovie = 'failed';
        })
    },
})

export default movieSlice.reducer;