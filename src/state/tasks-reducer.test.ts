import {v1} from "uuid";
import {TasksStateType} from "../App";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: TasksStateType
let taskId: string
let newTaskTitle: string
let newTodolistTitle: string
let newId: string
let isDone: boolean

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    taskId = v1()
    newId = v1()
    newTaskTitle = 'Skyrim'
    newTodolistTitle = 'New Title'
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
    const endState = tasksReducer(startState, removeTaskAC(todolistId1, taskId))

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1].every(t => t.id !== taskId)).toBeTruthy()
    expect(endState[todolistId1][0].title).toBe("HTML&CSS")
    expect(endState[todolistId1][1].title).not.toBe("JS")
})

test('correct task should be added', () => {
    const endState = tasksReducer(startState, addTaskAC(todolistId2, newTaskTitle))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId2][0].title).toBe(newTaskTitle)
    expect(endState[todolistId2][0].isDone).toBe(false)
})

test('correct task should change its name', () => {
    const endState = tasksReducer(startState, changeTaskTitleAC(todolistId1, taskId, newTaskTitle))

    expect(endState[todolistId1][1].title).toBe(newTaskTitle)
    expect(endState[todolistId2][1].title).toBe("React Book")
})

test('correct status of task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC(todolistId1, taskId, isDone))

    expect(endState[todolistId1][0].isDone).toBeTruthy()
    expect(endState[todolistId1][1].isDone).toBeFalsy()
})

test('correct todolist task should be removed', () => {
    const endState = tasksReducer(startState, removeTodolistAC(todolistId1))

    expect(Object.keys(endState).length).toBe(1)
    expect(Object.keys(endState)[0]).toBe(todolistId2)
    expect(endState[todolistId1]).toBeUndefined()
})

test('correct todolist task should be added', () => {
    const action = addTodolistAC(newTodolistTitle)

    const endState = tasksReducer(startState, action)

    expect(Object.keys(endState).length).toBe(3)
    expect(Object.keys(endState)[2]).toBe(action.payload.newId)
    expect(endState[action.payload.newId]).toStrictEqual([])
})