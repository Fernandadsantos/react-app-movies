import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/axios"; 
import { Genre } from "../../interfaces";

export const fetchGenres = createAsyncThunk(
    'genres/fetchGenres',
    async () => {
        const { data: { genres } } = await api
        .get("/genre/movie/list?api_key=1abb3e68d878be1155d781ce812f80a8&language=pt-BR")

        return genres;
    }
)
interface GenreState {
    genreList: Genre[];
    loadingGenre: string;
}

const initialState: GenreState = {
    genreList: [],
    loadingGenre: 'idle',
}

const genreSlice = createSlice({
    name: 'genres',
    initialState,
    reducers:{

    },
    extraReducers: (Builder) => {
        Builder
        .addCase(fetchGenres.fulfilled, (state, action) => {
            state.genreList = action.payload as Genre[];
            state.loadingGenre = 'succeeded';
        })

        .addCase(fetchGenres.pending, (state) => {
            state.genreList = [];
            state.loadingGenre = 'pending';
        })

        .addCase(fetchGenres.rejected, (state ) => {
            state.genreList = [];
            state.loadingGenre = 'failed';
        })
    }, 
})

export default genreSlice.reducer;
