/*
import {appActions, AppInitialStateType, appReducer} from './app-reducer';

let appStartState: AppInitialStateType

beforeEach(() => {
    appStartState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('correct status should be set', () => {
    const endState = appReducer(appStartState, appActions.setAppStatus('loading'))

    expect(endState.status).toBe('loading')
})

test('correct error message should be set', () => {
    const endState = appReducer(appStartState, appActions.setAppError('Error'))

    expect(endState.error).toBe('Error')
})

test('correct initialized value should be set', () => {
    const endState = appReducer(appStartState, appActions.setAppInitialized(true))

    expect(endState.isInitialized).toBe(true)
})*/
export {}