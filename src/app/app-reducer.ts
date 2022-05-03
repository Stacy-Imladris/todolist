import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {initializeApp} from './app-actions';

const appInitialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
}

export const slice = createSlice({
    name: 'app',
    initialState: appInitialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{error: null | string}>) {
            state.error = action.payload.error
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError} = slice.actions

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = typeof appInitialState