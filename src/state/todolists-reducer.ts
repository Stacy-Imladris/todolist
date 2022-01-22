import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>
type ActionTypes = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionTypes): Array<TodolistType> => {
    switch (action.type){
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.Tid)
        case 'ADD-TODOLIST':
            return [...state, {id: action.payload.newId, title: action.payload.title, filter: "all"}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.Tid ? {...tl, title: action.payload.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.Tid ? {...tl, filter: action.payload.filter} : tl)
        default:
            return state
    }
}

export const RemoveTodolistAC = (Tid: string) => {
    return {type: 'REMOVE-TODOLIST',
        payload: {Tid}} as const
}
export const AddTodolistAC = (newId: string, title: string) => {
    return {type: 'ADD-TODOLIST',
        payload: {newId, title}} as const
}
export const ChangeTodolistTitleAC = (Tid: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE',
        payload: {Tid, title}} as const
}
export const ChangeTodolistFilterAC = (Tid: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER',
        payload: {Tid, filter}} as const
}