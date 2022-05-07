import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {RequestStatusType, setAppStatus} from '../../app/app-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {handleServerAppError, handleServerNetworkError} from '../../utils';
import {fetchTasks} from './tasks-reducer';

export const fetchTodolists = createAsyncThunk('todolists/fetchTodolists', async (param, {
    dispatch,
    rejectWithValue
}) => {
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

export const deleteTodolist = createAsyncThunk('todolists/deleteTodolist', async (Tid: string, {
    dispatch,
    rejectWithValue
}) => {
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

export const createTodolist = createAsyncThunk('todolists/createTodolist', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
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

export const updateTodolistTitle = createAsyncThunk('todolists/updateTodolistTitle', async (payload: { Tid: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
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

export const todolistsAsyncActions = {
    fetchTodolists,
    deleteTodolist,
    createTodolist,
    updateTodolistTitle
}

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
    extraReducers: builder => builder
        .addCase(deleteTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(f => f.id === action.payload.Tid)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        .addCase(fetchTodolists.fulfilled, (state, action) => {
            return action.payload.todolists.map(m => ({...m, filter: 'all', entityStatus: 'idle'}))
        })
        .addCase(createTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        .addCase(updateTodolistTitle.fulfilled, (state, action) => {
            const index = state.findIndex(f => f.id === action.payload.Tid)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        })
})

export const todolistsReducer = slice.reducer
export const {changeTodolistEntityStatus, changeTodolistFilter, clearData} = slice.actions

//types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}