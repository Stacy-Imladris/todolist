import {todolistsActions} from './todolists-reducer';
import {AppRootStateType, AppThunk, InferActionTypes} from '../../app/store';
import {authAPI, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api';
import {appActions} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {authActions} from '../Login/auth-reducer';

const tasksInitialState: TasksStateType = {}

export const tasksReducer = (state = tasksInitialState, action: TasksActionTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.payload.Tid]: state[action.payload.Tid].filter(t => t.id !== action.payload.taskId)
            }
        case 'ADD_TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        case 'CHANGE_TASK':
            return {
                ...state,
                [action.payload.Tid]: state[action.payload.Tid].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.domainModel} : t)
            }
        case 'REMOVE_TODOLIST': {
            let copyState = {...state}
            delete copyState[action.payload.Tid]
            return copyState
        }
        case 'SET_TODOLISTS': {
            let copyState = {...state}
            action.payload.todolists.forEach(tl => copyState[tl.id] = [])
            return {...copyState}
        }
        case 'SET_TASKS':
            return {...state, [action.payload.Tid]: action.payload.tasks}
        case 'ADD_TODOLIST':
            return {...state, [action.payload.todolist.id]: []}
        case 'CLEAR_DATA':
            return {}
        default:
            return state
    }
}

export const tasksActions = {
    setTasks: (Tid: string, tasks: TaskType[]) => ({type: 'SET_TASKS', payload: {Tid, tasks}} as const),
    removeTask: (Tid: string, taskId: string) => ({type: 'REMOVE_TASK', payload: {Tid, taskId}} as const),
    addTask: (task: TaskType) => ({type: 'ADD_TASK', payload: {task}} as const),
    changeTask: (Tid: string, taskId: string, domainModel: Partial<UpdateTaskModelType>) =>
        ({type: 'CHANGE_TASK', payload: {Tid, taskId, domainModel}} as const),
}

export const fetchTasks = (Tid: string): AppThunk => async dispatch => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await todolistsAPI.getTasks(Tid)
        dispatch(tasksActions.setTasks(Tid, res.data.items))
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}
export const deleteTask = (todolistId: string, taskId: string): AppThunk => async dispatch => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await todolistsAPI.deleteTask(todolistId, taskId)
        if (res.data.resultCode === 0) {
            dispatch(tasksActions.removeTask(todolistId, taskId))
            dispatch(appActions.setAppStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}
export const createTask = (todolistId: string, title: string): AppThunk => async dispatch => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await todolistsAPI.createTask(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(tasksActions.addTask(res.data.data.item))
            dispatch(appActions.setAppStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}
export const updateTask = (todolistId: string, taskId: string, domainModel: Partial<UpdateTaskModelType>): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    dispatch(appActions.setAppStatus('loading'))
    const task = getState().tasks[todolistId].find(t => t.id === taskId)
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
        const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel)
        if (res.data.resultCode === 0) {
            dispatch(tasksActions.changeTask(todolistId, taskId, domainModel))
            dispatch(appActions.setAppStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error as Error)
    }
}

export type TasksStateType = {
    [key: string]: TaskType[]
}
export type TasksActionTypes = InferActionTypes<typeof tasksActions>
    | ReturnType<typeof todolistsActions.removeTodolist>
    | ReturnType<typeof todolistsActions.addTodolist>
    | ReturnType<typeof todolistsActions.setTodolists>
    | ReturnType<typeof todolistsActions.clearData>