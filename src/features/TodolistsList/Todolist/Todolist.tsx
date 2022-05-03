import {memo, useCallback} from 'react';
import {SuperInput} from '../../../components/SuperInput/SuperInput';
import {SuperSpan} from '../../../components/SuperSpan/SuperSpan';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../store/store';
import {Task} from './Task/Task';
import {
    changeTodolistFilter,
    deleteTodolist,
    FilterValuesType,
    updateTodolistTitle,
} from '../todolists-reducer';
import {createTask} from '../tasks-reducer';
import {TaskStatuses} from '../../../api/todolists-api';

type TodolistPropsType = {
    id: string
}
export const Todolist = memo(({id}: TodolistPropsType) => {
    console.log('Todolist')
    const {title, filter, entityStatus} = useAppSelector(state => state.todolists.filter(tl => tl.id === id)[0])
    const tasks = useAppSelector(state => state.tasks[id])
    const dispatch = useDispatch()

    const removeTodolist = useCallback(() => {
        dispatch(deleteTodolist(id))
    }, [dispatch, id])
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(updateTodolistTitle({Tid: id, title}))
    }, [dispatch, id])
    const changeFilter = useCallback((filter: FilterValuesType) => {
        dispatch(changeTodolistFilter({Tid: id, filter}))
    }, [dispatch, id])
    const addTask = useCallback((title: string) => {
        dispatch(createTask({Tid: id, title}))
    }, [dispatch, id])

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3 style={{textAlign: 'center'}}><SuperSpan title={title}
                                                         changeTitle={changeTodolistTitle}/>
                <IconButton size="small" onClick={removeTodolist}
                            disabled={entityStatus === 'loading'}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
            <SuperInput addHandler={addTask}
                        disabled={entityStatus === 'loading'}/>
            <div>
                {tasksForTodolist.map(t => <Task key={t.id}
                                                 taskId={t.id}
                                                 todolistId={id}/>)}
            </div>
            <div style={{marginTop: '5px'}}>
                <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => changeFilter('all')}>All</Button>
                <Button variant={filter === 'active' ? 'contained' : 'outlined'}
                        onClick={() => changeFilter('active')}>Active</Button>
                <Button
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={() => changeFilter('completed')}>Completed</Button>
            </div>
        </div>
    )
})