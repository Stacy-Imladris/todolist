import {useActions, useAppSelector} from '../../store/store';
import {useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../enums';
import {selectTodolists} from './selectors';
import {authSelectors} from '../Login';
import {Todolist, todolistsAsyncActions} from './index';
import {SuperInput} from '../../components';

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
        <Grid container style={{padding: '90px 20px 30px 20px'}}>
            <SuperInput addHandler={createTodolist}/>
        </Grid>
        <Grid container spacing={5} style={{flexWrap: 'nowrap', paddingBottom: '20px', overflowX: 'scroll', minHeight: '82vh'}}>
            {todolists.map(({id}) => <Grid item key={id} style={{paddingRight: '40px'}}>
                    <Paper elevation={3} style={{
                        padding: '10px',
                        minWidth: '350px', maxWidth: '350px',
                    }}>
                        <Todolist Tid={id}/>
                    </Paper>
                </Grid>
            )}
        </Grid>
    </>
}