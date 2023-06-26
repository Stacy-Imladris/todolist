import {Dispatch} from 'redux';
import {setAppError, setAppStatus} from 'app/app-reducer';
import {ResponseType} from 'api/api';

export const handleServerAppError = <D>(dispatch: Dispatch, data: ResponseType<D>) => {
    if (data.messages.length) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error: 'Some error occurred'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (dispatch: Dispatch, error: Error) => {
    dispatch(setAppError({error: error.message ? error.message : 'Some error occurred'}))
    dispatch(setAppStatus({status: 'failed'}))
}