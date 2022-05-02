import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TodolistsActionTypes, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {TasksActionTypes, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {AppActionTypes, appReducer} from './app-reducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {AuthActionTypes, authReducer} from '../features/Login/auth-reducer';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//types
export type AppRootStateType = ReturnType <typeof store.getState>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type AppActionsType = TodolistsActionTypes | TasksActionTypes | AppActionTypes | AuthActionTypes
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store