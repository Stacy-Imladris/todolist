import React from "react";
import {FilterValuesType, TaskType} from "./App";
import {SuperInput} from "./SuperInput";
import {SuperSpan} from "./SuperSpan";
import {Button, Checkbox, FormControlLabel, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type TodolistPropsType = {
    tasks: TaskType[]
    id: string
    title: string
    filter: FilterValuesType
    removeTodolist: (Tid: string) => void
    changeFilter: (Tid: string, filter: FilterValuesType) => void
    removeTask: (Tid: string, taskId: string) => void
    checkboxHandler: (Tid: string, taskId: string, isDone: boolean) => void
    addTask: (Tid: string, title: string) => void
    changeTaskTitle: (Tid: string, taskId: string, title: string) => void
    changeTodolistTitle: (Tid: string, title: string) => void
}
export const Todolist = (props: TodolistPropsType) => {

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const filterHandler = (value: FilterValuesType) => {
        props.changeFilter(props.id, value)
    }
    const removeTask = (taskId: string) => {
        props.removeTask(props.id, taskId)
    }
    const checkboxHandler = (taskId: string, isDone: boolean) => {
        props.checkboxHandler(props.id, taskId, isDone)
    }
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }
    const changeTaskTitle = (taskId: string, title: string) => {
        props.changeTaskTitle(props.id, taskId, title)
    }

    return (
        <div>
            <h3 style={ {textAlign: 'center'} }><SuperSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton size="small" onClick={removeTodolist}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </h3>
            <SuperInput addHandler={addTask}/>
            <div>
                {
                    props.tasks.map(t => {
                        return <div key={t.id} style={ {paddingLeft: '10px'} }>
                            <Checkbox
                                checked={t.isDone}
                                onChange={(e) => checkboxHandler(t.id, e.currentTarget.checked)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <SuperSpan title={t.title} changeTitle={(title) => changeTaskTitle(t.id, title)}/>
                            <IconButton size="small" onClick={() => removeTask(t.id)}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <Button variant={props.filter === 'all' ? "contained" : "outlined"} onClick={() => filterHandler('all')}>All</Button>
            <Button variant={props.filter === 'active' ? "contained" : "outlined"} onClick={() => filterHandler('active')}>Active</Button>
            <Button variant={props.filter === 'completed' ? "contained" : "outlined"} onClick={() => filterHandler('completed')}>Completed</Button>
        </div>
    )
}

