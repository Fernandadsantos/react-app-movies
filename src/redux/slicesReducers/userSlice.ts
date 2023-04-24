import { Build } from "@material-ui/icons";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import type { PayloadAction } from '@reduxjs/toolkit'


export function userData(user: UserData) {

}

interface UserData {
    user: {},
    loadingGenre: string,
}

const initialState: UserData = {
    user: {},
    loadingGenre: 'idle',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:   {
    }, 

})

export default userSlice.reducer;