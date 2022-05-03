import {createAsyncThunk} from '@reduxjs/toolkit';
import {setAppStatus} from '../../app/app-reducer';
import {todolistsAPI} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {changeTodolistEntityStatus} from './todolists-reducer';
import {fetchTasks} from './tasks-actions';

export const fetchTodolists = createAsyncThunk('todolists/fetchTodolists', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setAppStatus({status: 'succeeded'}))
        res.data.forEach(tl => dispatch(fetchTasks(tl.id)))
        return {todolists: res.data}
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        return rejectWithValue(null)
    }
})

export const deleteTodolist = createAsyncThunk('todolists/deleteTodolist', async (Tid: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({Tid, status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTodolist(Tid)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {Tid}
        } else {
            handleServerAppError(dispatch, res.data)
            dispatch(changeTodolistEntityStatus({Tid, status: 'failed'}))
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        dispatch(changeTodolistEntityStatus({Tid, status: 'failed'}))
        return rejectWithValue(null)
    }
})

export const createTodolist = createAsyncThunk('todolists/createTodolist', async (title: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(dispatch, res.data)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        return rejectWithValue(null)
    }
})

export const updateTodolistTitle = createAsyncThunk('todolists/updateTodolistTitle', async (payload: { Tid: string, title: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({Tid: payload.Tid, status: 'loading'}))
    try {
        const res = await todolistsAPI.updateTodolistTitle(payload.Tid, payload.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            dispatch(changeTodolistEntityStatus({Tid: payload.Tid, status: 'succeeded'}))
            return payload
        } else {
            handleServerAppError(dispatch, res.data)
            dispatch(changeTodolistEntityStatus({Tid: payload.Tid, status: 'failed'}))
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
        dispatch(changeTodolistEntityStatus({Tid: payload.Tid, status: 'failed'}))
        return rejectWithValue(null)
    }
})