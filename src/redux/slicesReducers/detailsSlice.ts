import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios"; 
import { IMovieDetails } from "../../interfaces";

export const fetchMovieDetailsById = createAsyncThunk(
    'details/fetchDetails',
    async (id: number) => {
        const { data } = await api
        .get(`/movie/${id}?&api_key=1abb3e68d878be1155d781ce812f80a8&language=pt-BR`)

        return data ;
    }
)

interface recommendationsState {
    movieDetails: IMovieDetails;
    loadingDetails: string;
}

const initialState: recommendationsState = {
    movieDetails: {} as IMovieDetails,
    loadingDetails: 'idle',
}

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchMovieDetailsById.fulfilled, (state, action) => {
            state.movieDetails = action.payload as IMovieDetails;
            state.loadingDetails = 'succeeded';
        })

        .addCase(fetchMovieDetailsById.pending, (state) => {
            state.movieDetails = {} as IMovieDetails;
            state.loadingDetails = 'pending';
        })

        .addCase(fetchMovieDetailsById.rejected, (state) => {
            state.movieDetails = {} as IMovieDetails;
            state.loadingDetails = 'failed';
        })
    },
})

export default detailsSlice.reducer;