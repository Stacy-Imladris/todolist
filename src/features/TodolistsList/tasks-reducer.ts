import {TaskType} from '../../api/todolists-api';
import {createSlice} from '@reduxjs/toolkit';
import {createTask, deleteTask, fetchTasks, updateTask} from './tasks-actions';
import {createTodolist, deleteTodolist, fetchTodolists} from './todolists-actions';
import {clearData} from './todolists-reducer';

const tasksInitialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: tasksInitialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(deleteTodolist.fulfilled, (state, action) => {
            delete state[action.payload.Tid]
        })
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach(tl => state[tl.id] = [])
        })
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(clearData, () => {
            return {}
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.Tid] = action.payload.tasks
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            const index = state[action.payload.Tid].findIndex(f => f.id === action.payload?.taskId)
            if (index > -1) {
                state[action.payload.Tid].splice(index, 1)
            }
        })
        builder.addCase(createTask.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const index = state[action.payload.Tid].findIndex(f => f.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.Tid][index] = {...state[action.payload.Tid][index], ...action.payload.domainModel}
            }
        })
    }
})

export const tasksReducer = slice.reducer

//types
export type TasksStateType = {
    [key: string]: TaskType[]
}
