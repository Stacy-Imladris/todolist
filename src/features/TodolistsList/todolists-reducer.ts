import {v1} from 'uuid';
import {AppThunk, InferActionTypes} from '../../app/store';
import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET_TODOLISTS':
            return action.payload.todolists.map(m => ({...m, filter: 'all'}))
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.payload.Tid)
        case 'ADD_TODOLIST':
            return [{...action.payload.todolist, filter: 'all'}, ...state]
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(tl => tl.id === action.payload.Tid ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(tl => tl.id === action.payload.Tid ? {...tl, filter: action.payload.filter} : tl)
        default:
            return state
    }
}

export const todolistsActions = {
    setTodolists: (todolists: TodolistType[]) => ({type: 'SET_TODOLISTS', payload: {todolists}} as const),
    removeTodolist: (Tid: string) => ({type: 'REMOVE_TODOLIST', payload: {Tid}} as const),
    addTodolist: (todolist: TodolistType) => ({type: 'ADD_TODOLIST', payload: {todolist}} as const),
    changeTodolistTitle: (Tid: string, title: string) =>
        ({type: 'CHANGE_TODOLIST_TITLE', payload: {Tid, title}} as const),
    changeTodolistFilter: (Tid: string, filter: FilterValuesType) =>
        ({type: 'CHANGE_TODOLIST_FILTER', payload: {Tid, filter}} as const),
}

export const fetchTodolists = (): AppThunk => async dispatch => {
    const res = await todolistsAPI.getTodolists()
    dispatch(todolistsActions.setTodolists(res.data))
}
export const deleteTodolist = (Tid: string): AppThunk => async dispatch => {
    const res = await todolistsAPI.deleteTodolist(Tid)
    dispatch(todolistsActions.removeTodolist(Tid))
}
export const createTodolist = (title: string): AppThunk => async dispatch => {
    const res = await todolistsAPI.createTodolist(title)
    dispatch(todolistsActions.addTodolist(res.data.data.item))
}
export const updateTodolistTitle = (todolistId: string, title: string): AppThunk => async dispatch => {
    const res = await todolistsAPI.updateTodolistTitle(todolistId, title)
    dispatch(todolistsActions.changeTodolistTitle(todolistId, title))
}

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type TodolistsActionTypes = InferActionTypes<typeof todolistsActions>