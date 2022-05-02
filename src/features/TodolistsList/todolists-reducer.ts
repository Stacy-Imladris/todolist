import {AppDispatch} from '../../app/store';
import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {RequestStatusType, setAppStatus} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {fetchTasks} from './tasks-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const todolistsInitialState: TodolistDomainType[] = []

const slice = createSlice({
    name: 'todolists',
    initialState: todolistsInitialState,
    reducers: {
        setTodolists(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(m => ({...m, filter: 'all', entityStatus: 'idle'}))
        },
        removeTodolist(state, action: PayloadAction<{ Tid: string }>) {
            const index = state.findIndex(f => f.id === action.payload.Tid)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolist(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({
                ...action.payload.todolist,
                filter: 'all',
                entityStatus: 'idle'
            })
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ Tid: string, status: RequestStatusType }>) {
            const index = state.findIndex(f => f.id === action.payload.Tid)
            if (index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },
        changeTodolistTitle(state, action: PayloadAction<{ Tid: string, title: string }>) {
            const index = state.findIndex(f => f.id === action.payload.Tid)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        },
        changeTodolistFilter(state, action: PayloadAction<{ Tid: string, filter: FilterValuesType }>) {
            const index = state.findIndex(f => f.id === action.payload.Tid)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        clearData() {
            return []
        },
    },
})

export const todolistsReducer = slice.reducer
export const {setTodolists, removeTodolist, addTodolist, changeTodolistEntityStatus,
    changeTodolistTitle, changeTodolistFilter, clearData} = slice.actions

//thunks
export const fetchTodolists = () => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodolists({todolists: res.data}))
        dispatch(setAppStatus({status: 'succeeded'}))
        res.data.forEach(tl => dispatch(fetchTasks(tl.id)))
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}

export const deleteTodolist = (Tid: string) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({Tid, status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTodolist(Tid)
        if (res.data.resultCode === 0) {
            dispatch(removeTodolist({Tid}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
            dispatch(changeTodolistEntityStatus({Tid, status: 'failed'}))
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        dispatch(changeTodolistEntityStatus({Tid, status: 'failed'}))
    }
}

export const createTodolist = (title: string) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(addTodolist({todolist: res.data.data.item}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}

export const updateTodolistTitle = (Tid: string, title: string) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({Tid, status: 'loading'}))
    try {
        const res = await todolistsAPI.updateTodolistTitle(Tid, title)
        if (res.data.resultCode === 0) {
            dispatch(changeTodolistTitle({Tid, title}))
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(changeTodolistEntityStatus({Tid, status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
            dispatch(changeTodolistEntityStatus({Tid, status: 'failed'}))
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        dispatch(changeTodolistEntityStatus({Tid, status: 'failed'}))
    }
}

//types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}