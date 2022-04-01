import {AppThunk, InferActionTypes} from './store';
import {authAPI} from '../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {authActions} from '../features/Login/auth-reducer';

const appInitialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
}

export const appReducer = (state: AppInitialStateType = appInitialState, action: AppActionTypes): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
        case 'APP/SET_ERROR':
        case 'APP/SET_IS_INITIALIZED':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const appActions = {
    setAppStatus: (status: RequestStatusType) => ({type: 'APP/SET_STATUS', payload: {status}} as const),
    setAppError: (error: null | string) => ({type: 'APP/SET_ERROR', payload: {error}} as const),
    setAppInitialized: (isInitialized: boolean) => ({type: 'APP/SET_IS_INITIALIZED', payload: {isInitialized}} as const),
}

export const initializeApp = (): AppThunk => async dispatch => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn(true))
            dispatch(appActions.setAppStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    } finally {
        dispatch(appActions.setAppInitialized(true))
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = typeof appInitialState
export type AppActionTypes = InferActionTypes<typeof appActions>