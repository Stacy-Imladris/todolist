import {authAPI} from '../api/todolists-api';
import {handleServerNetworkError} from '../utils/error-utils';
import {setIsLoggedIn} from '../features/Login/auth-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

const appInitialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
}

export const initializeApp = createAsyncThunk('app/initializeApp', async (param, {dispatch, rejectWithValue}) => {
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

const slice = createSlice({
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