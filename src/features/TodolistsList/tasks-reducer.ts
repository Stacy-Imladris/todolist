import {AppDispatch, RootState} from '../../app/store';
import {
    TaskType,
    todolistsAPI,
    TodolistType,
    UpdateTaskModelType
} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {setAppStatus} from '../../app/app-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addTodolist, clearData, removeTodolist, setTodolists} from './todolists-reducer';

const tasksInitialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: tasksInitialState,
    reducers: {
        setTasks(state, action: PayloadAction<{Tid: string, tasks: TaskType[]}>) {
            state[action.payload.Tid] = action.payload.tasks
        },
        removeTask(state, action: PayloadAction<{Tid: string, taskId: string}>) {
            const index = state[action.payload.Tid].findIndex(f => f.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.Tid].splice(index, 1)
            }
        },
        addTask(state, action: PayloadAction<{task: TaskType}>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        changeTask(state, action: PayloadAction<{Tid: string, taskId: string, domainModel: Partial<UpdateTaskModelType>}>) {
            const index = state[action.payload.Tid].findIndex(f => f.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.Tid][index] = {...state[action.payload.Tid][index], ...action.payload.domainModel}
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(removeTodolist, (state, action) => {
            delete state[action.payload.Tid]
        })
        builder.addCase(setTodolists, (state, action) => {
            action.payload.todolists.forEach(tl => state[tl.id] = [])
        })
        builder.addCase(addTodolist, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(clearData, () => {
            return {}
        })
    }
})

export const tasksReducer = slice.reducer
export const {setTasks, removeTask, addTask, changeTask} = slice.actions

//thunks
export const fetchTasks = (Tid: string) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTasks(Tid)
        dispatch(setTasks({Tid, tasks: res.data.items}))
        dispatch(setAppStatus({status: 'succeeded'}))
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}

export const deleteTask = (Tid: string, taskId: string) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTask(Tid, taskId)
        if (res.data.resultCode === 0) {
            dispatch(removeTask({Tid, taskId}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}

export const createTask = (todolistId: string, title: string) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTask({task: res.data.data.item}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}

export const updateTask = (Tid: string, taskId: string, domainModel: Partial<UpdateTaskModelType>) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setAppStatus({status: 'loading'}))
    const task = getState().tasks[Tid].find(t => t.id === taskId)
    if (!task) {
        console.warn('task not found in the state')
        return
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel
    }
    try {
        const res = await todolistsAPI.updateTask(Tid, taskId, apiModel)
        if (res.data.resultCode === 0) {
            dispatch(changeTask({Tid, taskId, domainModel}))
            dispatch(setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}

//types
export type TasksStateType = {
    [key: string]: TaskType[]
}
