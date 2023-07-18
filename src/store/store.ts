import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {useMemo} from 'react';
import {authReducer} from 'features/Login';
import {appReducer} from '../app';
import {tasksReducer, todolistsReducer} from '../features/TodolistsList';
import {FieldErrorType} from '../api/api';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export function useActions<T extends ActionCreatorsMapObject>(actions: T) {
    const dispatch = useAppDispatch()
    return useMemo(() => bindActionCreators(actions, dispatch), [])
}

//types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ThunkError = {
    rejectValue: {
        errors: string[],
        fieldsErrors?: FieldErrorType[]
    }
}

// @ts-ignore
window.store = store