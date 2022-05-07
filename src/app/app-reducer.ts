import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setIsLoggedIn} from '../features/Login/auth-reducer';
import {handleServerNetworkError} from '../utils';
import {authAPI} from '../api';

export const initializeApp = createAsyncThunk('app/initializeApp', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({isLoggedIn: true}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            dispatch(setAppStatus({status: 'failed'}))
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        return rejectWithValue(null)
    }
})

export const appAsyncActions = {initializeApp}
export const setAppStatus = createAction<{ status: RequestStatusType }>('app/setAppStatus')
export const setAppError = createAction<{ error: null | string }>('app/setAppError')

const appInitialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
}

export const slice = createSlice({
    name: 'app',
    initialState: appInitialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(initializeApp.fulfilled, (state) => {
            state.isInitialized = true
        })
        .addCase(initializeApp.rejected, (state) => {
            state.isInitialized = true
        })
        .addCase(setAppStatus, (state, action) => {
            state.status = action.payload.status
        })
        .addCase(setAppError, (state, action) => {
            state.error = action.payload.error
        })
})

export const appReducer = slice.reducer

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = typeof appInitialState