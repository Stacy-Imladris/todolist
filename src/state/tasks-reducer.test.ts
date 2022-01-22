import {v1} from "uuid";
import {TasksStateType} from "../App";
import {
    AddTaskAC,
    AddTodolistTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC, RemoveTodolistTaskAC,
    tasksReducer
} from "./tasks-reducer";

let todolistId1: string
let todolistId2: string
let startState: TasksStateType
let taskId: string
let newTaskTitle: string
let newId: string
let isDone: boolean

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    taskId = v1()
    newId = v1()
    newTaskTitle = 'Skyrim'
    isDone = false
    startState = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: taskId, title: "JS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: false},
            {id: v1(), title: "React", isDone: true}
        ]
    };
})

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, RemoveTaskAC(todolistId1, taskId))

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId1][1].title).toBe("JS/TS")
})

test('correct task should be added', () => {
    const endState = tasksReducer(startState, AddTaskAC(todolistId2, newTaskTitle))

    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][3].title).toBe(newTaskTitle)
    expect(endState[todolistId2][3].isDone).toBe(false)
})

test('correct task should change its name', () => {
    const endState = tasksReducer(startState, ChangeTaskTitleAC(todolistId1, taskId, newTaskTitle))

    expect(endState[todolistId1][0].title).toBe("HTML&CSS")
    expect(endState[todolistId1][1].title).toBe(newTaskTitle)
})

test('correct status of task should be changed', () => {
    const endState = tasksReducer(startState, ChangeTaskStatusAC(todolistId1, taskId, isDone))

    expect(endState[todolistId1][0].isDone).toBe(true)
    expect(endState[todolistId1][1].isDone).toBe(isDone)
})

test('correct todolist task should be removed', () => {
    const endState = tasksReducer(startState, RemoveTodolistTaskAC(todolistId1))

    expect(Object.keys(endState).length).toBe(1)
    expect(Object.keys(endState)[0]).toBe(todolistId2)
})

test('correct todolist task should be added', () => {
    const endState = tasksReducer(startState, AddTodolistTaskAC(newId))

    expect(Object.keys(endState).length).toBe(3)
    expect(Object.keys(endState)[2]).toBe(newId)
})