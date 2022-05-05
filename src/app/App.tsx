import {AppBar, Button, CircularProgress, Container, IconButton, LinearProgress,
    Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {TodolistsList} from '../features/TodolistsList';
import {useActions, useAppSelector} from '../store/store';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useEffect} from 'react';
import {PATH} from '../enums/paths';
import {selectAppIsInitialized, selectAppStatus} from './selectors';
import {authAsyncActions, authSelectors, Login} from '../features/Login';
import {appAsyncActions} from './app-reducer';
import {ErrorSnackbar} from '../components';

export const App = () => {
    const status = useAppSelector(selectAppStatus)
    const isInitialized = useAppSelector(selectAppIsInitialized)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const {initializeApp, logout} = useActions({...appAsyncActions, ...authAsyncActions})

    useEffect(() => {
        initializeApp()
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div style={{position: 'relative'}}>
            <ErrorSnackbar/>
            <AppBar position="static" style={{width: '100%', position: 'fixed', zIndex: '1'}}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>News</Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logout}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path='/' element={<Navigate to={PATH.MAIN}/>}/>
                    <Route path={PATH.MAIN} element={<TodolistsList/>}/>
                    <Route path={PATH.LOGIN} element={<Login/>}/>
                    <Route path={PATH.ERROR_404} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={PATH.ERROR_404}/>}/>
                </Routes>
            </Container>
        </div>
    )
}