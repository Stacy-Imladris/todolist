import {AuthInitialStateType, authReducer, setIsLoggedIn} from './auth-reducer';

let authStartState: AuthInitialStateType

beforeEach(() => {
    authStartState = {
        isLoggedIn: false
    }
})

test('correct isLoggedIn value should be set', () => {
    const endState = authReducer(authStartState, setIsLoggedIn({isLoggedIn: true}))

    expect(endState.isLoggedIn).toBe(true)
})