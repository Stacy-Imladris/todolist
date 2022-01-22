import {TasksStateType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = ReturnType<typeof RemoveTaskAC>
export type AddTaskActionType = ReturnType<typeof AddTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof ChangeTaskTitleAC>
export type ChangeTaskStatusActionType = ReturnType<typeof ChangeTaskStatusAC>
export type RemoveTodolistTaskActionType = ReturnType<typeof RemoveTodolistTaskAC>
export type AddTodolistTaskActionType = ReturnType<typeof AddTodolistTaskAC>
type ActionTypes = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskTitleActionType | ChangeTaskStatusActionType
    | RemoveTodolistTaskActionType | AddTodolistTaskActionType

export const tasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {
    switch (action.type){
        case 'REMOVE-TASK':
            return {...state, [action.payload.Tid]: state[action.payload.Tid].filter(t => t.id !== action.payload.taskId)}
        case 'ADD-TASK':
            return {...state, [action.payload.Tid]: [...state[action.payload.Tid], {id: v1(), title: action.payload.title, isDone: false}]}
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.payload.Tid]: state[action.payload.Tid].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)}
        case 'CHANGE-TASK-STATUS':
            return {...state, [action.payload.Tid]: state[action.payload.Tid].map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)}
        case 'REMOVE-TODOLIST-TASKS':
            delete state[action.payload.Tid]
            return state
        case 'ADD-TODOLIST-TASKS':
            return {...state, [action.payload.newId]: []}
        default:
            return state
    }
}

export const RemoveTaskAC = (Tid: string, taskId: string) => {
    return {type: 'REMOVE-TASK',
        payload: {Tid, taskId}} as const
}
export const AddTaskAC = (Tid: string, title: string) => {
    return {type: 'ADD-TASK',
        payload: {Tid, title}} as const
}
export const ChangeTaskTitleAC = (Tid: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE',
        payload: {Tid, taskId, title}} as const
}
export const ChangeTaskStatusAC = (Tid: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS',
        payload: {Tid, taskId, isDone}} as const
}
export const RemoveTodolistTaskAC = (Tid: string) => {
    return {type: 'REMOVE-TODOLIST-TASKS',
        payload: {Tid}} as const
}
export const AddTodolistTaskAC = (newId: string) => {
    return {type: 'ADD-TODOLIST-TASKS',
        payload: {newId}} as const
}