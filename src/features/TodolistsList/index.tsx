import * as todolistsSelectors from './selectors'
import {tasksAsyncActions, tasksReducer} from './tasks-reducer'
import {todolistsAsyncActions, todolistsReducer} from './todolists-reducer'
import {slice} from './todolists-reducer'
import {TodolistsList} from './TodolistsList'
import {Todolist} from './Todolist/Todolist'
import {Task} from './Todolist/Task/Task'

const todolistsActions = slice.actions

export {
    todolistsSelectors,
    tasksAsyncActions,
    tasksReducer,
    todolistsAsyncActions,
    todolistsActions,
    todolistsReducer,
    TodolistsList,
    Todolist,
    Task
}