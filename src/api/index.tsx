import {authAPI} from './auth-api'
import {tasksAPI} from './tasks-api'
import {todolistsAPI} from './todolists-api'
import {TodolistType as TodolistTypePseudo} from './todolists-api'
import {LoginParamsType as LoginParamsTypePseudo} from './auth-api'
import {TaskType as TaskTypePseudo, UpdateTaskModelType as UpdateTaskModelTypePseudo} from './tasks-api'

export type TodolistType = TodolistTypePseudo
export type LoginParamsType = LoginParamsTypePseudo
export type TaskType = TaskTypePseudo
export type UpdateTaskModelType = UpdateTaskModelTypePseudo

export {
    authAPI,
    tasksAPI,
    todolistsAPI,
}