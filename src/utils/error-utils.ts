import {appActions, AppActionTypes} from '../app/app-reducer';
import {ResponseType} from '../api/todolists-api';
import {Dispatch} from 'redux';

export const handleServerAppError = <D>(dispatch: Dispatch<AppActionTypes>, data: ResponseType<D>) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError(data.messages[0]))
    } else {
        dispatch(appActions.setAppError('Some error occurred'))
    }
    dispatch(appActions.setAppStatus('failed'))
}

export const handleServerNetworkError = (dispatch: Dispatch<AppActionTypes>, error: Error) => {
    dispatch(appActions.setAppError(error.message ? error.message : 'Some error occurred'))
    dispatch(appActions.setAppStatus('failed'))
}