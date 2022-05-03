import {v1} from 'uuid';
import {
    changeTodolistEntityStatus,
    changeTodolistFilter,
    createTodolist,
    deleteTodolist,
    fetchTodolists,
    FilterValuesType,
    TodolistDomainType,
    todolistsReducer,
    updateTodolistTitle
} from './todolists-reducer';

let todolistId1: string
let todolistId2: string
let newTodolistTitle: string
export let todolistsStartState: TodolistDomainType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    newTodolistTitle = 'New Title'
    todolistsStartState = [
        {id: todolistId1, title: "What to learn", addedDate: '', order: 0, filter: "all", entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", addedDate: '', order: 0, filter: "all", entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {
    const action = deleteTodolist.fulfilled({Tid: todolistId1}, 'requestId', todolistId1)
    const endState = todolistsReducer(todolistsStartState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const action = createTodolist.fulfilled({todolist: {
            id: v1(), title: newTodolistTitle, addedDate: '', order: 0,}}, 'requestId', newTodolistTitle)
    const endState = todolistsReducer(todolistsStartState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBeDefined()
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    const updatePayload = {Tid: todolistId2, title: newTodolistTitle}
    const action = updateTodolistTitle.fulfilled(updatePayload, 'requestId', updatePayload)
    const endState = todolistsReducer(todolistsStartState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    const newTodolistFilter: FilterValuesType = 'active'

    const endState = todolistsReducer(todolistsStartState, changeTodolistFilter({Tid: todolistId2, filter: newTodolistFilter}))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newTodolistFilter)
})

test('todolists should be set to the state', () => {
    const action = fetchTodolists.fulfilled({todolists: todolistsStartState}, 'requestId')
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})

test('correct entity status should be changed', () => {
    const endState = todolistsReducer(todolistsStartState, changeTodolistEntityStatus({Tid: todolistId1, status: 'loading'}))

    expect(endState[0].entityStatus).toBe('loading')
    expect(endState[1].entityStatus).toBe('idle')
})