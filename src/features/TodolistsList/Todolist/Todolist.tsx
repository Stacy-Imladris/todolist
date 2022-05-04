import {memo, useCallback} from 'react';
import {SuperInput} from '../../../components/SuperInput/SuperInput';
import {SuperSpan} from '../../../components/SuperSpan/SuperSpan';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useActions, useAppSelector} from '../../../store/store';
import {Task} from './Task/Task';
import {TaskStatuses} from '../../../api/todolists-api';
import {tasksAsyncActions, todolistsActions, todolistsAsyncActions} from '../index';

type TodolistPropsType = {
    Tid: string
}
export const Todolist = memo(({Tid}: TodolistPropsType) => {
    const {
        title,
        filter,
        entityStatus
    } = useAppSelector(state => state.todolists.filter(tl => tl.id === Tid)[0])
    const tasks = useAppSelector(state => state.tasks[Tid])
    const {
        createTask,
        deleteTodolist,
        updateTodolistTitle,
        changeTodolistFilter
    } = useActions({...tasksAsyncActions, ...todolistsAsyncActions, ...todolistsActions})

    const removeTodolist = useCallback(() => deleteTodolist(Tid), [Tid])

    const changeTodolistTitle = useCallback((title: string) =>
        updateTodolistTitle({Tid, title}), [Tid])

    const addTask = useCallback((title: string) => createTask({Tid, title}), [Tid])

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3 style={{textAlign: 'center'}}>
                <SuperSpan title={title} changeTitle={changeTodolistTitle}/>
                <IconButton size="small" onClick={removeTodolist}
                            disabled={entityStatus === 'loading'}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
            <SuperInput addHandler={addTask} disabled={entityStatus === 'loading'}/>
            <div>
                {tasksForTodolist.map(({id}) => <Task key={id} taskId={id} Tid={Tid}/>)}
            </div>
            <div style={{marginTop: '5px'}}>
                <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                        onClick={() => changeTodolistFilter({Tid, filter: 'all'})}>All</Button>
                <Button variant={filter === 'active' ? 'contained' : 'outlined'}
                        onClick={() => changeTodolistFilter({Tid, filter: 'active'})}>Active</Button>
                <Button variant={filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={() => changeTodolistFilter({Tid, filter: 'completed'})}>Completed</Button>
            </div>
        </div>
    )
})