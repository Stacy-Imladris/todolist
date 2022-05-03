import {RootState} from './store';

export const selectAppStatus = (state: RootState) => state.app.status
export const selectAppError = (state: RootState) => state.app.error
export const selectAppIsInitialized = (state: RootState) => state.app.isInitialized
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectTodolists = (state: RootState) => state.todolists