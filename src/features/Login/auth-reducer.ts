import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setAppStatus} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils';
import {AxiosError} from 'axios';
import {clearData} from '../TodolistsList/todolists-reducer';
import {ThunkError} from '../../store/store';
import {authAPI} from '../../api';
import {LoginParamsType} from '../../api/auth-api';

export const login = createAsyncThunk<undefined, LoginParamsType, ThunkError>('auth/login', async (data, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue({
                errors: res.data.messages,
                fieldsErrors: res.data.fieldsErrors
            })
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        return rejectWithValue({
            errors: [(error as AxiosError).message],
            fieldsErrors: undefined
        })
    }
})

export const logout = createAsyncThunk('auth/logout', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(clearData())
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue({})
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        return rejectWithValue({})
    }
})

export const authAsyncActions = {login, logout}

const authInitialState = {
    isLoggedIn: false
}

export const slice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        },
    },
    extraReducers: builder => builder
        .addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        .addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false
        })
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions

//types
export type AuthInitialStateType = typeof authInitialState