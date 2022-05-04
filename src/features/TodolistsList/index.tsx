import * as todolistsSelectors from './selectors'
import {tasksAsyncActions} from './tasks-reducer'
import {todolistsAsyncActions} from './todolists-reducer'
import {slice} from './todolists-reducer'

const todolistsActions = slice.actions

export {
    todolistsSelectors,
    tasksAsyncActions,
    todolistsAsyncActions,
    todolistsActions
}