import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

//C-R-UD
export function App() {
    //BLL:
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
        ])
    const todoListTitle: string = "What to learn"
    const changeFilter = (filter: FilterValuesType) => setFilter(filter)
    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }
    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
        /*const newTask: TaskType = {
            id: v1(),
            title: "hey",
            isDone: false
        }
        setTasks([newTask, ...tasks])*/
    }

    /*const getTasksForRender = () => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case "active":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
     */

    const changeTaskStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone} : t))
    }

    let tasksForRender = tasks;
    if(filter === "active"){
        tasksForRender = tasks.filter(t => !t.isDone)
    }
    if(filter === "completed"){
        tasksForRender = tasks.filter(t => t.isDone)
    }

    //UI:
    return (
        <div className="App">
            <TodoList
                filter={filter}
                title={todoListTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

