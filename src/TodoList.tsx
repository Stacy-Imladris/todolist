import {memo, useCallback} from 'react';
import {SuperInput} from './SuperInput';
import {SuperSpan} from './SuperSpan';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {Task} from './Task';
import {FilterValuesType, todolistsActions, todolistsActionTypes, TodolistType} from './state/todolists-reducer';
import {tasksActions, tasksActionTypes, TaskType} from './state/tasks-reducer';
import {Dispatch} from 'redux';

type TodolistPropsType = {
    id: string
}
export const Todolist = memo((props: TodolistPropsType) => {
    console.log('Todolist')
    const dispatch = useDispatch<Dispatch<todolistsActionTypes | tasksActionTypes>>()
    const todolist = useSelector<AppRootState, TodolistType>(state => state.todolists.filter(tl => tl.id === props.id)[0])
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[todolist.id])

    const removeTodolist = useCallback(() => {
        dispatch(todolistsActions.removeTodolist(props.id))
    }, [dispatch, props.id])
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(todolistsActions.changeTodolistTitle(props.id, title))
    }, [dispatch, props.id])
    const changeFilter = useCallback((filter: FilterValuesType) => {
        dispatch(todolistsActions.changeTodolistFilter(props.id, filter))
    }, [dispatch, props.id])
    const addTask = useCallback((title: string) => {
        dispatch(tasksActions.addTask(props.id, title))
    }, [dispatch, props.id])

    let tasksForTodolist = tasks
    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    return (
        <div>
            <h3 style={{textAlign: 'center'}}><SuperSpan title={todolist.title} changeTitle={changeTodolistTitle}/>
                <IconButton size="small" onClick={removeTodolist}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
            <SuperInput addHandler={addTask}/>
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