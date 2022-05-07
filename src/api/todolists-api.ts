import {AxiosResponse} from 'axios';
import {instance, ResponseType} from './api';

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
}

//types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}