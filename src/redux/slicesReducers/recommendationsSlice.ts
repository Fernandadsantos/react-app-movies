import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import { Movie } from "../../interfaces";   

export const fetchMovieRecommendationsById = createAsyncThunk(
    'movieRcommendations/fetchRecommendations',
    async (id: number) => {
        const { data: { results } } = await api
            .get(`/movie/${id}/recommendations?&api_key=1abb3e68d878be1155d781ce812f80a8&language=pt-BR`)

            return results;
    }
)

interface recommendationsState {
    movieRecommendations: Movie[];
    loadingMovieRecommendations: string;
}

const initialState: recommendationsState = {
    movieRecommendations: [],
    loadingMovieRecommendations: 'idle',
}

const recommendationsSlice = createSlice({
    name: 'recommendations',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchMovieRecommendationsById.fulfilled, (state, action) => {
            state.movieRecommendations = action.payload as Movie[];
            state.loadingMovieRecommendations = 'succeeded';
        })

        .addCase(fetchMovieRecommendationsById.pending, (state) => {
            state.movieRecommendations = [];
            state.loadingMovieRecommendations = 'pending';
        })

        .addCase(fetchMovieRecommendationsById.rejected, (state) => {
            state.movieRecommendations = [];
            state.loadingMovieRecommendations = 'failed';
        })
    },
})

export default recommendationsSlice.reducer;