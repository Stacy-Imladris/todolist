import axios, {AxiosResponse} from 'axios';
import {TaskPriorities} from '../enums/taskPriorities';
import {TaskStatuses} from '../enums/taskStatuses';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'c2512ed0-ae10-41e2-9947-2f9cd9cdb666'
    }
})

//api
export const authAPI = {
    me() {
        return instance.get<any, AxiosResponse<ResponseType<MeResponseType>>>('auth/me')
    },
    login(data: LoginParamsType) {
        return instance.post<any, AxiosResponse<ResponseType<{userId?: number}>>, LoginParamsType>(`auth/login`, data)
    },
    logout() {
        return instance.delete<any, AxiosResponse<ResponseType>>(`auth/login`)
    },
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<any, AxiosResponse<TodolistType[]>>(`todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<any, AxiosResponse<ResponseType<{item: TodolistType}>>, {title: string}>(`todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<any, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<any, AxiosResponse<ResponseType>, {title: string}>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<any, AxiosResponse<GetTasksResponse>>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<any, AxiosResponse<ResponseType<{item: TaskType}>>, {title: string}>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<any, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<any, AxiosResponse<ResponseType<{item: TaskType}>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}

//types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
type MeResponseType = {
    id: number
    email: string
    login: string
}
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}
export type GetTasksResponse = {
    items: TaskType[]
    totalCount: number
    error: null | string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type FieldErrorType = {
    field: string
    error: string
}
export type ResponseType<D = {}> = {
    data: D
    messages: string[]
    fieldsErrors: FieldErrorType[]
    resultCode: number
}