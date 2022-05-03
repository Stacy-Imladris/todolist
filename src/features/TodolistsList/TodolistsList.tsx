import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../store/store';
import {createTodolist, fetchTodolists} from './todolists-reducer';
import {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import {SuperInput} from '../../components/SuperInput/SuperInput';
import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../enums/paths';
import {selectIsLoggedIn, selectTodolists} from '../../store/selectors';

export const TodolistsList = () => {
    const todolists = useAppSelector(selectTodolists)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
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

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

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