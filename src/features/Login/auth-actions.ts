import {createAsyncThunk} from '@reduxjs/toolkit';
import {authAPI, FieldErrorType, LoginParamsType} from '../../api/todolists-api';
import {setAppStatus} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {clearData} from '../TodolistsList/todolists-reducer';

export const login = createAsyncThunk<undefined, LoginParamsType, {rejectValue: {
        errors: string[], fieldsErrors?: FieldErrorType[]
    }}>('auth/login', async (data, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        return rejectWithValue({errors: [(error as AxiosError).message], fieldsErrors: undefined})
    }
})

export const logout = createAsyncThunk('auth/logout', async (param, {dispatch, rejectWithValue}) => {
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