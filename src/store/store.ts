import {combineReducers} from 'redux';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {appReducer} from '../app/app-reducer';
import thunk from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {authReducer} from '../features/Login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';

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

//types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store