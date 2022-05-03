import {createAsyncThunk} from '@reduxjs/toolkit';
import {authAPI} from '../api/todolists-api';
import {setIsLoggedIn} from '../features/Login/auth-reducer';
import {handleServerNetworkError} from '../utils/error-utils';
import {setAppStatus} from './app-reducer';

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