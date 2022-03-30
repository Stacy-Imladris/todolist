import {v1} from 'uuid';
import {todolistsActions} from './todolists-reducer';
import {AppRootStateType, AppThunk, InferActionTypes} from '../../app/store';
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    TodolistType,
    UpdateTaskModelType
} from '../../api/todolists-api';

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TasksActionTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.payload.Tid]: state[action.payload.Tid].filter(t => t.id !== action.payload.taskId)
            }
        case 'ADD_TASK':
            return {
                ...state, [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        case 'CHANGE_TASK':
            return {
                ...state,
                [action.payload.Tid]: state[action.payload.Tid].map(t => t.id === action.payload.taskId ? {
                    ...t, ...action.payload.domainModel
                } : t)
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
    const res = await todolistsAPI.getTasks(Tid)
    dispatch(tasksActions.setTasks(Tid, res.data.items))
}
export const deleteTask = (todolistId: string, taskId: string): AppThunk => async dispatch => {
    const res = await todolistsAPI.deleteTask(todolistId, taskId)
    dispatch(tasksActions.removeTask(todolistId, taskId))
}
export const createTask = (todolistId: string, title: string): AppThunk => async dispatch => {
    const res = await todolistsAPI.createTask(todolistId, title)
    dispatch(tasksActions.addTask(res.data.data.item))
}
export const updateTask = (todolistId: string, taskId: string, domainModel: Partial<UpdateTaskModelType>): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
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
    const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel)
    dispatch(tasksActions.changeTask(todolistId, taskId, domainModel))
}

export type TasksStateType = {
    [key: string]: TaskType[]
}
export type TasksActionTypes = InferActionTypes<typeof tasksActions>
    | ReturnType<typeof todolistsActions.removeTodolist>
    | ReturnType<typeof todolistsActions.addTodolist>
    | ReturnType<typeof todolistsActions.setTodolists>