import {memo, useCallback, useEffect} from 'react';
import {SuperInput} from '../../../components/SuperInput/SuperInput';
import {SuperSpan} from '../../../components/SuperSpan/SuperSpan';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../app/store';
import {Task} from './Task/Task';
import {deleteTodolist, FilterValuesType, todolistsActions, updateTodolistTitle,} from '../todolists-reducer';
import {createTask, fetchTasks} from '../tasks-reducer';
import {TaskStatuses} from '../../../api/todolists-api';

type TodolistPropsType = {
    id: string
}
export const Todolist = memo((props: TodolistPropsType) => {
    console.log('Todolist')
    const todolist = useAppSelector(state => state.todolists.filter(tl => tl.id === props.id)[0])
    const tasks = useAppSelector(state => state.tasks[todolist.id])
    const dispatch = useDispatch()

    const removeTodolist = useCallback(() => {
        dispatch(deleteTodolist(props.id))
    }, [dispatch, props.id])
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(updateTodolistTitle(props.id, title))
    }, [dispatch, props.id])
    const changeFilter = useCallback((filter: FilterValuesType) => {
        dispatch(todolistsActions.changeTodolistFilter(props.id, filter))
    }, [dispatch, props.id])
    const addTask = useCallback((title: string) => {
        dispatch(createTask(props.id, title))
    }, [dispatch, props.id])

    let tasksForTodolist = tasks
    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3 style={{textAlign: 'center'}}><SuperSpan title={todolist.title} changeTitle={changeTodolistTitle}/>
                <IconButton size="small" onClick={removeTodolist} disabled={todolist.entityStatus === 'loading'}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
            <SuperInput addHandler={addTask} disabled={todolist.entityStatus === 'loading'}/>
            <div>
                {tasksForTodolist.map(t => <Task key={t.id}
                                                    taskId={t.id}
                                                    todolistId={todolist.id}/>)}
            </div>
            <div style={{marginTop: '5px'}}>
                <Button variant={todolist.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => changeFilter('all')}>All</Button>
                <Button variant={todolist.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={() => changeFilter('active')}>Active</Button>
                <Button variant={todolist.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={() => changeFilter('completed')}>Completed</Button>
            </div>
        </div>
    )
})