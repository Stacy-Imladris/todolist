import {v1} from "uuid";
import {todolistsActions} from "./todolists-reducer";
import {InferActionTypes} from "./store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}
export type tasksActionTypes = InferActionTypes<typeof tasksActions>
    | ReturnType <typeof todolistsActions.removeTodolist> | ReturnType <typeof todolistsActions.addTodolist>

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: tasksActionTypes): TasksStateType => {
    switch (action.type){
        case 'REMOVE_TASK':
            return {...state, [action.payload.Tid]: state[action.payload.Tid].filter(t => t.id !== action.payload.taskId)}
        case 'ADD_TASK':
            return {...state, [action.payload.Tid]: [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.Tid]]}
        case 'CHANGE_TASK_TITLE':
            return {...state, [action.payload.Tid]: state[action.payload.Tid].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)}
        case 'CHANGE_TASK_STATUS':
            return {...state, [action.payload.Tid]: state[action.payload.Tid].map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)}
        case 'REMOVE_TODOLIST':
            let copyState = {...state}
            delete copyState[action.payload.Tid]
            return copyState
        case 'ADD_TODOLIST':
            return {...state, [action.payload.newId]: []}
        default:
            return state
    }
}

export const tasksActions = {
    removeTask: (Tid: string, taskId: string) => ({type: 'REMOVE_TASK', payload: {Tid, taskId}} as const),
    addTask: (Tid: string, title: string) => ({type: 'ADD_TASK', payload: {Tid, title}} as const),
    changeTaskTitle: (Tid: string, taskId: string, title: string) => ({type: 'CHANGE_TASK_TITLE', payload: {Tid, taskId, title}} as const),
    changeTaskStatus: (Tid: string, taskId: string, isDone: boolean) => ({type: 'CHANGE_TASK_STATUS', payload: {Tid, taskId, isDone}} as const),
}