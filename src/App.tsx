import {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {todolistsActions, todolistsActionTypes, TodolistType} from "./state/todolists-reducer";
import {Dispatch} from "redux";
import {SuperInput} from './SuperInput';

export function App() {
    console.log('App')
    const dispatch = useDispatch<Dispatch<todolistsActionTypes>>()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)

    const addTodolist = useCallback((title: string) => {
        dispatch(todolistsActions.addTodolist(title))
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <SuperInput addHandler={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(tl => {
                        return <Grid item key={tl.id}>
                            <Paper elevation={3} style={{padding: '10px'}}>
                                <Todolist key={tl.id}
                                          id={tl.id}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App

