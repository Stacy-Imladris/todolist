import {v1} from "uuid";
import {InferActionTypes} from "./store";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type todolistsActionTypes = InferActionTypes<typeof todolistsActions>

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state = initialState, action: todolistsActionTypes): Array<TodolistType> => {
    switch (action.type){
        case 'REMOVE_TODOLIST':
            return state.filter(tl => tl.id !== action.payload.Tid)
        case 'ADD_TODOLIST':
            return [{id: action.payload.newId, title: action.payload.title, filter: "all"}, ...state]
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(tl => tl.id === action.payload.Tid ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(tl => tl.id === action.payload.Tid ? {...tl, filter: action.payload.filter} : tl)
        default:
            return state
    }
}

export const todolistsActions = {
    removeTodolist: (Tid: string) => ({type: 'REMOVE_TODOLIST', payload: {Tid}} as const),
    addTodolist: (title: string) => ({type: 'ADD_TODOLIST', payload: {newId: v1(), title}} as const),
    changeTodolistTitle: (Tid: string, title: string) => ({type: 'CHANGE_TODOLIST_TITLE', payload: {Tid, title}} as const),
    changeTodolistFilter: (Tid: string, filter: FilterValuesType) => ({type: 'CHANGE_TODOLIST_FILTER', payload: {Tid, filter}} as const),
}