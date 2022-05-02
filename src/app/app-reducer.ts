import {authAPI} from '../api/todolists-api';
import {handleServerNetworkError} from '../utils/error-utils';
import {setIsLoggedIn} from '../features/Login/auth-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from './store';

const appInitialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
}

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
        setAppInitialized(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        },
    }
})

export const appReducer = slice.reducer
export const {setAppStatus, setAppError, setAppInitialized} = slice.actions

//thunk
export const initializeApp = () => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({isLoggedIn: true}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            dispatch(setAppStatus({status: 'failed'}))
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    } finally {
        dispatch(setAppInitialized({isInitialized: true}))
    }
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'