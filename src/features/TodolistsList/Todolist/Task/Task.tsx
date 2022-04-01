import {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {SuperSpan} from '../../../../components/SuperSpan/SuperSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../../app/store';
import {deleteTask, updateTask} from '../../tasks-reducer';
import {TaskStatuses} from '../../../../api/todolists-api';

type TaskPropsType = {
    taskId: string
    todolistId: string
}
export const Task = memo((props: TaskPropsType) => {
    console.log('Task')

    const task = useAppSelector(state => state.tasks[props.todolistId].filter(t => t.id === props.taskId)[0])
    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(deleteTask(props.todolistId, props.taskId))
    }, [dispatch, props.todolistId, task.id])
    const checkboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask(props.todolistId, task.id, {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}))
    }, [dispatch, props.todolistId, task.id])
    const changeTaskTitle = useCallback((title: string) => {
        dispatch(updateTask(props.todolistId, task.id, {title}))
    }, [dispatch, props.todolistId, task.id])

    return (
        <div style={{paddingLeft: '10px'}}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={checkboxHandler}
                inputProps={{'aria-label': 'controlled'}}
            />
            <SuperSpan title={task.title} changeTitle={changeTaskTitle}/>
            <IconButton size="small" onClick={removeTask}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </div>
    )
})