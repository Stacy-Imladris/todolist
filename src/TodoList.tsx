import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksList = props.tasks.map((t: TaskType) => {
        const onRemoveHandler = () => props.removeTask(t.id)
        const changeStatus = (e:ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
        return (
            <li key={t.id}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
                <button onClick={onRemoveHandler}>x</button>
            </li>
        )
    })
    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickSetAllFilter = () => props.changeFilter("all")
    const onClickSetActiveFilter = () => props.changeFilter("active")
    const onClickSetCompletedFilter = () => props.changeFilter("completed")
    /*let allBtnClasses = ""
    if(props.filter === "all"){
        allBtnClasses = "active-filter"
    }*/
    const getBtnClass = (filter: FilterValuesType) => {
        return props.filter === filter ? "active-filter" : ""
    }

    const errorMessage = error
        ? <div style={{color: "red"}}>Title is required!</div>
        : <div>Enter task title</div>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? "error" : ""}
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button className={getBtnClass("all")} onClick={onClickSetAllFilter}>All</button>
                <button className={getBtnClass("active")} onClick={onClickSetActiveFilter}>Active</button>
                <button className={getBtnClass("completed")} onClick={onClickSetCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;