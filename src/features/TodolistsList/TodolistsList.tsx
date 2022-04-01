import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../app/store';
import {createTodolist, fetchTodolists} from './todolists-reducer';
import {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import {SuperInput} from '../../components/SuperInput/SuperInput';
import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';

export const TodolistsList = () => {
    const todolists = useAppSelector(state => state.todolists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolists())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
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
    </>
}