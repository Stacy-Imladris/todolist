import * as appSelectors from './selectors'
import {initializeApp, slice, appReducer} from './app-reducer'

const appActions = slice.actions

export {
    appSelectors,
    initializeApp,
    appActions,
    appReducer
}