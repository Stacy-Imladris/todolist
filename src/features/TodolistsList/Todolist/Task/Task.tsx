import {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useActions, useAppSelector} from '../../../../store/store';
import {tasksAsyncActions} from '../../index';
import {TaskStatuses} from '../../../../enums';
import {SuperSpan} from '../../../../components';
import s from './Task.module.css'

type TaskPropsType = {
    taskId: string
    Tid: string
}
export const Task = memo(({taskId, Tid}: TaskPropsType) => {
    const task = useAppSelector(state => state.tasks[Tid].filter(t => t.id === taskId)[0])
    const {deleteTask, updateTask} = useActions(tasksAsyncActions)

    const removeTask = useCallback(() => {
        deleteTask({Tid, taskId})
    }, [Tid, taskId])

    const checkboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            Tid, taskId, domainModel: {
                status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
            }
        })
    }, [Tid, taskId])

    const changeTaskTitle = useCallback((title: string) => {
        updateTask({Tid, taskId, domainModel: {title}})
    }, [Tid, taskId])

    return <div className={s.container}>
        <div className={s.checkbox}>
            <Checkbox checked={task.status === TaskStatuses.Completed}
                      onChange={checkboxHandler} inputProps={{'aria-label': 'controlled'}}/>
        </div>
        <div className={s.taskBox}>
            <div className={s.title}>
                <SuperSpan title={task.title} changeTitle={changeTaskTitle}/>
            </div>
            <IconButton size="small" onClick={removeTask}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </div>
    </div>
})