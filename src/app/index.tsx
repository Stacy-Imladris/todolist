import * as appSelectors from './selectors'
import * as appAsyncActions from './app-actions'
import {slice} from './app-reducer'

const appActions = slice.actions

export {appSelectors, appAsyncActions, appActions}