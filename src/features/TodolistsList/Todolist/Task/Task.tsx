import {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {SuperSpan} from '../../../../components/SuperSpan/SuperSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../../store/store';
import {deleteTask, updateTask} from '../../tasks-reducer';
import {TaskStatuses} from '../../../../api/todolists-api';

type TaskPropsType = {
    taskId: string
    todolistId: string
}
export const Task = memo(({taskId, todolistId}: TaskPropsType) => {
    console.log('Task')
    const task = useAppSelector(state => state.tasks[todolistId].filter(t => t.id === taskId)[0])
    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(deleteTask({Tid: todolistId, taskId: taskId}))
    }, [dispatch, todolistId, task.id])

    const checkboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask({Tid: todolistId, taskId: task.id, domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}}))
    }, [dispatch, todolistId, task.id])

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(updateTask({Tid: todolistId, taskId: task.id, domainModel: {title}}))
    }, [dispatch, todolistId, task.id])

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