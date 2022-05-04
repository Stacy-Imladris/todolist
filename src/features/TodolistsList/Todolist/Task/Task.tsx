import {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {SuperSpan} from '../../../../components/SuperSpan/SuperSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import {useActions, useAppSelector} from '../../../../store/store';
import {TaskStatuses} from '../../../../api/todolists-api';
import {tasksAsyncActions} from '../../index';

type TaskPropsType = {
    taskId: string
    Tid: string
}
export const Task = memo(({taskId, Tid}: TaskPropsType) => {
    const task = useAppSelector(state => state.tasks[Tid].filter(t => t.id === taskId)[0])
    const {deleteTask, updateTask} = useActions(tasksAsyncActions)

    const removeTask = useCallback(() => deleteTask({Tid, taskId}), [Tid, taskId])

    const checkboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => updateTask({
        Tid,
        taskId,
        domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
    }), [Tid, taskId])

    const changeTaskTitle = useCallback((title: string) => {
        updateTask({Tid, taskId, domainModel: {title}})
    }, [Tid, taskId])

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