import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

//C-R-UD
function App() {
    //BLL:
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id: 1, title: "HTML", isDone: true},
            {id: 2, title: "CSS", isDone: true},
            {id: 3, title: "JS/TS", isDone: false},
        ])
    const todoListTitle: string = "What to learn"
    const changeFilter = (filter: FilterValuesType) => setFilter(filter)
    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const getTasksForRender = () => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case "active":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }

    /*let tasksForRender = tasks;
    if(filter === "active"){
        tasksForRender = tasks.filter(t => !t.isDone)
    }
    if(filter === "completed"){
        tasksForRender = tasks.filter(t => t.isDone)
    }*/

    //UI:
    return (
        <div className="App">
            <TodoList
                filter={filter}
                title={todoListTitle}
                tasks={getTasksForRender()}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;

