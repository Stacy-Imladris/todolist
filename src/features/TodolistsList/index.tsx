import * as todolistsSelectors from './selectors'
import * as tasksActions from './tasks-actions'
import * as todolistsAsyncActions from './todolists-actions'
import {slice} from './todolists-reducer'

const todolistsActions = slice.actions

export {
    todolistsSelectors,
    tasksActions,
    todolistsAsyncActions,
    todolistsActions
}