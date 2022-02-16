import React, {useCallback} from "react";
import {FilterValuesType, TaskType, TodolistType} from "./App";
import {SuperInput} from "./SuperInput";
import {SuperSpan} from "./SuperSpan";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {Task} from "./Task";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";

type TodolistPropsType = {
    id: string
}
export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log('Todolist')
    const dispatch = useDispatch()
    const todolist = useSelector<AppRootState, TodolistType>(state => state.todolists.filter(tl => tl.id === props.id)[0])
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(props.id))
    }, [dispatch, props.id])
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(props.id, title))
    }, [dispatch, props.id])
    const changeFilter = useCallback((filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(props.id, filter))
    }, [dispatch, props.id])
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.id, title))
    }, [dispatch])

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
                {
                    tasksForTodolist.map(t => <Task key={t.id}
                                                    taskId={t.id}
                                                    todolistId={todolist.id}/>)
                }
            </div>
            <Button variant={todolist.filter === 'all' ? "contained" : "outlined"}
                    onClick={() => changeFilter('all')}>All</Button>
            <Button variant={todolist.filter === 'active' ? "contained" : "outlined"}
                    onClick={() => changeFilter('active')}>Active</Button>
            <Button variant={todolist.filter === 'completed' ? "contained" : "outlined"}
                    onClick={() => changeFilter('completed')}>Completed</Button>
        </div>
    )
})