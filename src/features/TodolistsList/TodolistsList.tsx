import {useActions, useAppSelector} from 'store/store';
import {useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import {Navigate} from 'react-router-dom';
import {PATH} from 'enums';
import {selectTodolists} from './selectors';
import {authSelectors} from 'features/Login';
import {Todolist, todolistsAsyncActions} from './index';
import {SuperInput} from 'components';

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
        <Grid style={{flexWrap: 'nowrap', paddingBottom: '20px', overflowX: 'scroll', minHeight: '82vh'}}
              container spacing={5} >
            {todolists.map(({id}) => <Grid item key={id} style={{paddingRight: '40px'}}>
                    <Paper style={{padding: '10px', minWidth: '350px', maxWidth: '350px'}}
                           elevation={3}>
                        <Todolist Tid={id}/>
                    </Paper>
                </Grid>
            )}
        </Grid>
    </>
}