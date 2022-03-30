import {v1} from "uuid";
import {FilterValuesType, TodolistDomainType, todolistsActions, todolistsReducer} from './todolists-reducer';

let todolistId1: string
let todolistId2: string
let newTodolistTitle: string
export let todolistsStartState: TodolistDomainType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    newTodolistTitle = 'New Title'
    todolistsStartState = [
        {id: todolistId1, title: "What to learn", addedDate: '', order: 0, filter: "all"},
        {id: todolistId2, title: "What to buy", addedDate: '', order: 0, filter: "all"}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(todolistsStartState, todolistsActions.removeTodolist(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const endState = todolistsReducer(todolistsStartState, todolistsActions.addTodolist({
        id: v1(), title: newTodolistTitle, addedDate: '', order: 0,}))

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBeDefined()
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    const endState = todolistsReducer(todolistsStartState, todolistsActions.changeTodolistTitle(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    const newTodolistFilter: FilterValuesType = 'active'

    const endState = todolistsReducer(todolistsStartState, todolistsActions.changeTodolistFilter(todolistId2, newTodolistFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newTodolistFilter)
})

test('todolists should be set to the state', () => {
    const endState = todolistsReducer([], todolistsActions.setTodolists(todolistsStartState))

    expect(endState.length).toBe(2)
})