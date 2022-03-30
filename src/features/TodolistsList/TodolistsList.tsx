import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {createTodolist, fetchTodolists, TodolistDomainType} from './todolists-reducer';
import {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import {SuperInput} from '../../components/SuperInput/SuperInput';
import {Todolist} from './Todolist/Todolist';

export const TodolistsList = () => {
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolists())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [dispatch])

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