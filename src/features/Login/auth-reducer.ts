import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {login, logout} from './auth-actions';

const authInitialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{isLoggedIn: boolean}>) {
            state.isLoggedIn = action.payload.isLoggedIn
        },
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions

//types
export type AuthInitialStateType = typeof authInitialState