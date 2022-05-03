import {TodolistType} from '../../api/todolists-api';
import {RequestStatusType} from '../../app/app-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    createTodolist,
    deleteTodolist,
    fetchTodolists,
    updateTodolistTitle
} from './todolists-actions';

const todolistsInitialState: TodolistDomainType[] = []

export const slice = createSlice({
    name: 'todolists',
    initialState: todolistsInitialState,
    reducers: {
        changeTodolistEntityStatus(state, action: PayloadAction<{ Tid: string, status: RequestStatusType }>) {
            const index = state.findIndex(f => f.id === action.payload.Tid)
            if (index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },
        changeTodolistFilter(state, action: PayloadAction<{ Tid: string, filter: FilterValuesType }>) {
            const index = state.findIndex(f => f.id === action.payload.Tid)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        clearData() {
            return []
        },
    },
    extraReducers: builder => {
        builder.addCase(deleteTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(f => f.id === action.payload.Tid)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            return action.payload.todolists.map(m => ({...m, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(updateTodolistTitle.fulfilled, (state, action) => {
            const index = state.findIndex(f => f.id === action.payload.Tid)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        })
    }
})

export const todolistsReducer = slice.reducer
export const {changeTodolistEntityStatus, changeTodolistFilter, clearData} = slice.actions

//types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}