import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";
import {SuperInput} from "./SuperInput";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    AddTaskAC,
    AddTodolistTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC, RemoveTodolistTaskAC,
    tasksReducer
} from "./state/tasks-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

export function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()
    let [todolists, todolistsDispatch] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])
    let [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false},
            {id: v1(), title: "React", isDone: true}
        ]
    });

    const removeTodolist = (Tid: string) => {
        todolistsDispatch(RemoveTodolistAC(Tid))
        tasksDispatch(RemoveTodolistTaskAC(Tid))
    }
    const addTodolist = (title: string) => {
        debugger
        let newId = v1()
        todolistsDispatch(AddTodolistAC(newId, title))
        tasksDispatch(AddTodolistTaskAC(newId))
    }
    const changeTodolistTitle = (Tid: string, title: string) => {
        todolistsDispatch(ChangeTodolistTitleAC(Tid, title))
    }
    const changeFilter = (Tid: string, filter: FilterValuesType) => {
        todolistsDispatch(ChangeTodolistFilterAC(Tid, filter))
    }
    const removeTask = (Tid: string, taskId: string) => {
        tasksDispatch(RemoveTaskAC(Tid, taskId))
    }
    const addTask = (Tid: string, title: string) => {
        tasksDispatch(AddTaskAC(Tid, title))
    }
    const changeTaskTitle = (Tid: string, taskId: string, title: string) => {
        tasksDispatch(ChangeTaskTitleAC(Tid, taskId, title))
    }
    const checkboxHandler = (Tid: string, taskId: string, isDone: boolean) => {
        tasksDispatch(ChangeTaskStatusAC(Tid, taskId, isDone))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={ {padding: '20px'} }>
                    <SuperInput addHandler={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(tl => {
                        let filteredTasks = tasks[tl.id]
                        if (tl.filter === 'active') {
                            filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                        }
                        if (tl.filter === 'completed') {
                            filteredTasks = tasks[tl.id].filter(t => t.isDone)
                        }
                        return <Grid item key={tl.id}>
                            <Paper elevation={3} style={ {padding: '10px'} }>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    tasks={filteredTasks}
                                    removeTodolist={removeTodolist}
                                    changeFilter={changeFilter}
                                    removeTask={removeTask}
                                    checkboxHandler={checkboxHandler}
                                    addTask={addTask}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App

