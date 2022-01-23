import {TasksStateType} from "../App";
import {v1} from "uuid";
import {RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type AddTodolistTaskActionType = ReturnType<typeof addTodolistTaskAC>
type ActionTypes = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskTitleActionType | ChangeTaskStatusActionType
    | RemoveTodolistActionType | AddTodolistTaskActionType

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
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.payload.Tid]
            return copyState
        case 'ADD-TODOLIST-TASKS':
            return {...state, [action.payload.newId]: []}
        default:
            return state
    }
}

export const removeTaskAC = (Tid: string, taskId: string) => {
    return {type: 'REMOVE-TASK',
        payload: {Tid, taskId}} as const
}
export const addTaskAC = (Tid: string, title: string) => {
    return {type: 'ADD-TASK',
        payload: {Tid, title}} as const
}
export const changeTaskTitleAC = (Tid: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE',
        payload: {Tid, taskId, title}} as const
}
export const changeTaskStatusAC = (Tid: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS',
        payload: {Tid, taskId, isDone}} as const
}
export const addTodolistTaskAC = (newId: string) => {
    return {type: 'ADD-TODOLIST-TASKS',
        payload: {newId}} as const
}