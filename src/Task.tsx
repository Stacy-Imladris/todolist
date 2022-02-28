import {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {SuperSpan} from "./SuperSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {tasksActions, tasksActionTypes, TaskType} from "./state/tasks-reducer";
import {Dispatch} from "redux";

type TaskPropsType = {
    taskId: string
    todolistId: string
}
export const Task = memo((props: TaskPropsType) => {
    console.log('Task')
    const dispatch = useDispatch<Dispatch<tasksActionTypes>>()
    const task = useSelector<AppRootState, TaskType>(state => state.tasks[props.todolistId].filter(t => t.id === props.taskId)[0])

    const removeTask = useCallback(() => {
        dispatch(tasksActions.removeTask(props.todolistId, task.id))
    }, [dispatch, props.todolistId, task.id])
    const checkboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(tasksActions.changeTaskStatus(props.todolistId, task.id, e.currentTarget.checked))
    }, [dispatch, props.todolistId, task.id])
    const changeTaskTitle = useCallback((title: string) => {
        dispatch(tasksActions.changeTaskTitle(props.todolistId, task.id, title))
    }, [dispatch, props.todolistId, task.id])

    return (
        <div style={{paddingLeft: '10px'}}>
            <Checkbox
                checked={task.isDone}
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