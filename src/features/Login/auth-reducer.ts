import {AppThunk, InferActionTypes} from '../../app/store';
import {appActions} from '../../app/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {todolistsActions} from '../TodolistsList/todolists-reducer';

const authInitialState = {
    isLoggedIn: false
}

export const authReducer = (state: AuthInitialStateType = authInitialState, action: AuthActionTypes): AuthInitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET_IS_LOGGED_IN':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const authActions = {
    setIsLoggedIn: (isLoggedIn: boolean) => ({type: 'LOGIN/SET_IS_LOGGED_IN', payload: {isLoggedIn}} as const),
}

//thunks
export const login = (data: LoginParamsType): AppThunk => async dispatch => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn(true))
            dispatch(appActions.setAppStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}

export const logout = (): AppThunk => async dispatch => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn(false))
            dispatch(todolistsActions.clearData())
            dispatch(appActions.setAppStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}

//types
export type AuthInitialStateType = typeof authInitialState
export type AuthActionTypes = InferActionTypes<typeof authActions>