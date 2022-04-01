import {authActions, AuthInitialStateType, authReducer} from './auth-reducer';

let authStartState: AuthInitialStateType

beforeEach(() => {
    authStartState = {
        isLoggedIn: false
    }
})

test('correct isLoggedIn value should be set', () => {
    const endState = authReducer(authStartState, authActions.setIsLoggedIn(true))

    expect(endState.isLoggedIn).toBe(true)
})