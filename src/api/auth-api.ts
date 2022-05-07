import {AxiosResponse} from 'axios';
import {instance, ResponseType} from './api';

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