import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setAppStatus} from '../../app/app-reducer';
import {AppDispatch} from '../../app/store';
import {clearData} from '../TodolistsList/todolists-reducer';

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
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions

//thunks
export const login = (data: LoginParamsType) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({isLoggedIn: true}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({isLoggedIn: false}))
            dispatch(clearData())
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}