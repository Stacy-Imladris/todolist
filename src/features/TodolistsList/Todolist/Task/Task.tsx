import {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useActions, useAppSelector} from '../../../../store/store';
import {tasksAsyncActions} from '../../index';
import {TaskStatuses} from '../../../../enums/taskStatuses';
import {SuperSpan} from '../../../../components';

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
        <div style={{paddingLeft: '10px', display: 'flex'}}>
            <div style={{width: '10%'}}>
                <Checkbox
                    checked={task.status === TaskStatuses.Completed}
                    onChange={checkboxHandler}
                    inputProps={{'aria-label': 'controlled'}}
                />
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '75%', paddingLeft: '15px'}}>
            <div style={{paddingTop: '7px'}}><SuperSpan title={task.title} changeTitle={changeTaskTitle}/></div>
                <IconButton size="small" onClick={removeTask}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </div>
        </div>
    )
})