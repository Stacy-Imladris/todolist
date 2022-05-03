import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useActions, useAppSelector} from '../store/store';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {useEffect} from 'react';
import {PATH} from '../enums/paths';
import {selectAppIsInitialized, selectAppStatus} from './selectors';
import {authActions, authSelectors} from '../features/Login';
import {appAsyncActions} from './index';

export const App = () => {
    const status = useAppSelector(selectAppStatus)
    const isInitialized = useAppSelector(selectAppIsInitialized)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const {initializeApp, logout} = useActions({...appAsyncActions, ...authActions})

    useEffect(() => {
        initializeApp()
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
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
                    <Route path='/' element={<Navigate to={PATH.LOGIN}/>}/>
                    <Route path={PATH.MAIN} element={<TodolistsList/>}/>
                    <Route path={PATH.LOGIN} element={<Login/>}/>
                    <Route path={PATH.ERROR_404} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={PATH.ERROR_404}/>}/>
                </Routes>
            </Container>
        </div>
    )
}