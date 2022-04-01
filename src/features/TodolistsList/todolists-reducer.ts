import {AppThunk, InferActionTypes} from '../../app/store';
import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {appActions, RequestStatusType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {fetchTasks} from './tasks-reducer';

const todolistsInitialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = todolistsInitialState, action: TodolistsActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET_TODOLISTS':
            return action.payload.todolists.map(m => ({...m, filter: 'all', entityStatus: 'idle'}))
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.payload.Tid)
        case 'ADD_TODOLIST':
            return [{...action.payload.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE_TODOLIST_ENTITY_STATUS':
            return state.map(tl => tl.id === action.payload.Tid ? {...tl, entityStatus: action.payload.status} : tl)
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(tl => tl.id === action.payload.Tid ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(tl => tl.id === action.payload.Tid ? {...tl, filter: action.payload.filter} : tl)
        case 'CLEAR_DATA':
            return []
        default:
            return state
    }
}

export const todolistsActions = {
    setTodolists: (todolists: TodolistType[]) => ({type: 'SET_TODOLISTS', payload: {todolists}} as const),
    removeTodolist: (Tid: string) => ({type: 'REMOVE_TODOLIST', payload: {Tid}} as const),
    addTodolist: (todolist: TodolistType) => ({type: 'ADD_TODOLIST', payload: {todolist}} as const),
    changeTodolistEntityStatus: (Tid: string, status: RequestStatusType) => ({
        type: 'CHANGE_TODOLIST_ENTITY_STATUS',
        payload: {Tid, status}
    } as const),
    changeTodolistTitle: (Tid: string, title: string) =>
        ({type: 'CHANGE_TODOLIST_TITLE', payload: {Tid, title}} as const),
    changeTodolistFilter: (Tid: string, filter: FilterValuesType) =>
        ({type: 'CHANGE_TODOLIST_FILTER', payload: {Tid, filter}} as const),
    clearData: () =>
        ({type: 'CLEAR_DATA'} as const),
}

export const fetchTodolists = (): AppThunk => async dispatch => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(todolistsActions.setTodolists(res.data))
        dispatch(appActions.setAppStatus('succeeded'))
        res.data.forEach(tl => dispatch(fetchTasks(tl.id)))
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}
export const deleteTodolist = (Tid: string): AppThunk => async dispatch => {
    dispatch(appActions.setAppStatus('loading'))
    dispatch(todolistsActions.changeTodolistEntityStatus(Tid, 'loading'))
    try {
        const res = await todolistsAPI.deleteTodolist(Tid)
        if (res.data.resultCode === 0) {
            dispatch(todolistsActions.removeTodolist(Tid))
            dispatch(appActions.setAppStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
            dispatch(todolistsActions.changeTodolistEntityStatus(Tid, 'failed'))
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        dispatch(todolistsActions.changeTodolistEntityStatus(Tid, 'failed'))
    }
}
export const createTodolist = (title: string): AppThunk => async dispatch => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(todolistsActions.addTodolist(res.data.data.item))
            dispatch(appActions.setAppStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}
export const updateTodolistTitle = (todolistId: string, title: string): AppThunk => async dispatch => {
    dispatch(appActions.setAppStatus('loading'))
    dispatch(todolistsActions.changeTodolistEntityStatus(todolistId, 'loading'))
    try {
        const res = await todolistsAPI.updateTodolistTitle(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(todolistsActions.changeTodolistTitle(todolistId, title))
            dispatch(appActions.setAppStatus('succeeded'))
            dispatch(todolistsActions.changeTodolistEntityStatus(todolistId, 'succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
            dispatch(todolistsActions.changeTodolistEntityStatus(todolistId, 'failed'))
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        dispatch(todolistsActions.changeTodolistEntityStatus(todolistId, 'failed'))
    }
}

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type TodolistsActionTypes = InferActionTypes<typeof todolistsActions>