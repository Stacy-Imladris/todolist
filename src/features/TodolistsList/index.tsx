import * as todolistsSelectors from './selectors'
import {tasksAsyncActions} from './tasks-reducer'
import {todolistsAsyncActions} from './todolists-reducer'
import {slice} from './todolists-reducer'
import {TodolistsList} from './TodolistsList'
import {Todolist} from './Todolist/Todolist'
import {Task} from './Todolist/Task/Task'

const todolistsActions = slice.actions

export {
    todolistsSelectors,
    tasksAsyncActions,
    todolistsAsyncActions,
    todolistsActions,
    TodolistsList,
    Todolist,
    Task
}