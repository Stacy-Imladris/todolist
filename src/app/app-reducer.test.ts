import {
    AppInitialStateType,
    appReducer,
    setAppError,
    setAppStatus
} from './app-reducer';
import {initializeApp} from './app-actions';

let appStartState: AppInitialStateType

beforeEach(() => {
    appStartState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('correct status should be set', () => {
    const endState = appReducer(appStartState, setAppStatus({status: 'loading'}))

    expect(endState.status).toBe('loading')
})

test('correct error message should be set', () => {
    const endState = appReducer(appStartState, setAppError({error: 'Error'}))

    expect(endState.error).toBe('Error')
})

test('correct initialized value should be set', () => {
    const action = initializeApp.fulfilled(undefined, 'requestId')
    const endState = appReducer(appStartState, action)

    expect(endState.isInitialized).toBe(true)
})