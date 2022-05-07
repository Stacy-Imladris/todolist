import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'c2512ed0-ae10-41e2-9947-2f9cd9cdb666'
    }
})

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