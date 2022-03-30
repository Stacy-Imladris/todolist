import {applyMiddleware, combineReducers, createStore} from 'redux';
import {TasksActionTypes, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {TodolistsActionTypes, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType <typeof rootReducer>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type AppActionsType = TodolistsActionTypes | TasksActionTypes
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store