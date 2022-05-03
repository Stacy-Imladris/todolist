import {useActions, useAppSelector} from '../../store/store';
import {useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import {SuperInput} from '../../components/SuperInput/SuperInput';
import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../enums/paths';
import {selectTodolists} from './selectors';
import {authSelectors} from '../Login';
import {todolistsAsyncActions} from './index';

export const TodolistsList = () => {
    const todolists = useAppSelector(selectTodolists)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const {fetchTodolists, createTodolist} = useActions(todolistsAsyncActions)

    useEffect(() => {
        if (!isLoggedIn) return;
        fetchTodolists()
    }, [])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>

    return <>
        <Grid container style={{padding: '20px'}}>
            <SuperInput addHandler={createTodolist}/>
        </Grid>
        <Grid container spacing={5}>
            {todolists.map(({id}) => <Grid item key={id}>
                    <Paper elevation={3} style={{padding: '10px'}}>
                        <Todolist Tid={id}/>
                    </Paper>
                </Grid>
            )}
        </Grid>
    </>
}