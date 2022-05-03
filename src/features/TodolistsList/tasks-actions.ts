import {createAsyncThunk} from '@reduxjs/toolkit';
import {setAppStatus} from '../../app/app-reducer';
import {todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {RootState} from '../../store/store';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (Tid: string, {dispatch,  rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTasks(Tid)
        dispatch(setAppStatus({status: 'succeeded'}))
        return {Tid, tasks: res.data.items}
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        return rejectWithValue(null)
    }
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (payload: { Tid: string, taskId: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTask(payload.Tid, payload.taskId)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return payload
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        return rejectWithValue(null)
    }
})

export const createTask = createAsyncThunk('tasks/createTask', async (payload: { Tid: string, title: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(payload.Tid, payload.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {task: res.data.data.item}
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        return rejectWithValue(null)
    }
})

export const updateTask = createAsyncThunk('tasks/updateTask', async (payload: { Tid: string, taskId: string, domainModel: Partial<UpdateTaskModelType> }, {dispatch, getState, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    const task = (getState() as RootState).tasks[payload.Tid].find(t => t.id === payload.taskId)
    if (!task) {
        return rejectWithValue('task not found in the state')
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...payload.domainModel
    }
    try {
        const res = await todolistsAPI.updateTask(payload.Tid, payload.taskId, apiModel)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return payload
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        return rejectWithValue(null)
    }
})