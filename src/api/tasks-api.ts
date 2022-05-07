import {AxiosResponse} from 'axios';
import {TaskPriorities, TaskStatuses} from '../enums';
import {instance, ResponseType} from './api';

export const tasksAPI = {
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