import * as appSelectors from './selectors'
import {initializeApp} from './app-reducer'
import {slice} from './app-reducer'

const appActions = slice.actions

export {appSelectors, initializeApp, appActions}