import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {SuperSpan} from "./SuperSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./App";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task')
    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(props.todolistId, props.task.id))
    }, [dispatch, props.todolistId, props.task.id])
    const checkboxHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.todolistId, props.task.id, e.currentTarget.checked))
    }, [dispatch, props.todolistId, props.task.id])
    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.todolistId, props.task.id, title))
    }, [dispatch, props.todolistId, props.task.id])

    return (
        <div style={{paddingLeft: '10px'}}>
            <Checkbox
                checked={props.task.isDone}
                onChange={checkboxHandler}
                inputProps={{'aria-label': 'controlled'}}
            />
            <SuperSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton size="small" onClick={removeTask}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </div>
    )
})