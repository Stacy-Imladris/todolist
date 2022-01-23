import {FilterValuesType, TodolistType} from "../App";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
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

export const removeTodolistAC = (Tid: string) => {
    return {type: 'REMOVE-TODOLIST',
        payload: {Tid}} as const
}
export const addTodolistAC = (newId: string, title: string) => {
    return {type: 'ADD-TODOLIST',
        payload: {newId, title}} as const
}
export const changeTodolistTitleAC = (Tid: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE',
        payload: {Tid, title}} as const
}
export const changeTodolistFilterAC = (Tid: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER',
        payload: {Tid, filter}} as const
}