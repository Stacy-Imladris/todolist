import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from './todolists-reducer'
import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";

let todolistId1: string
let todolistId2: string
let newTodolistTitle: string
let startState: Array<TodolistType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    newTodolistTitle = 'New Title'
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let newId = v1()

    const endState = todolistsReducer(startState, AddTodolistAC(newId, newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('all')
    expect(endState[2].id).toBe(newId)
})

test('correct todolist should change its name', () => {
    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    const newTodolistFilter: FilterValuesType = 'active'

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, newTodolistFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newTodolistFilter)
})