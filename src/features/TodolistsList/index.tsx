import * as todolistsSelectors from './selectors'
import * as tasksActions from './tasks-actions'
import {todolistsAsyncActions} from './todolists-reducer'
import {slice} from './todolists-reducer'

const todolistsActions = slice.actions

export {
    todolistsSelectors,
    tasksActions,
    todolistsAsyncActions,
    todolistsActions
}