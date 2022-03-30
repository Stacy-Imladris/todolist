import {v1} from 'uuid';
import {tasksActions, tasksReducer, TasksStateType} from './tasks-reducer';
import {todolistsActions} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../../api/todolists-api';
import {todolistsStartState} from './todolists-reducer.test';

let todolistId1: string
let todolistId2: string
let tasksStartState: TasksStateType
let taskId: string
let newTaskTitle: string
let newTodolistTitle: string
let newId: string
let status: TaskStatuses

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    taskId = v1()
    newId = v1()
    newTaskTitle = 'Skyrim'
    newTodolistTitle = 'New Title'
    status = TaskStatuses.New
    tasksStartState = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", description: '', todoListId: todolistId1, order: 0, status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',},
            {id: taskId, title: "JS", description: '', todoListId: todolistId1, order: 0, status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',},
            {id: v1(), title: "JS/TS", description: '', todoListId: todolistId1, order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", description: '', todoListId: todolistId2, order: 0, status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',},
            {id: v1(), title: "React Book", description: '', todoListId: todolistId2, order: 0, status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',},
            {id: v1(), title: "React", description: '', todoListId: todolistId2, order: 0, status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: '', deadline: '', addedDate: '',}
        ]
    };
})

test('correct task should be removed', () => {
    const endState = tasksReducer(tasksStartState, tasksActions.removeTask(todolistId1, taskId))

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1].every(t => t.id !== taskId)).toBeTruthy()
    expect(endState[todolistId1][0].title).toBe("HTML&CSS")
    expect(endState[todolistId1][1].title).not.toBe("JS")
})

test('correct task should be added', () => {
    const endState = tasksReducer(tasksStartState, tasksActions.addTask({
        id: v1(),
        title: newTaskTitle,
        description: '',
        todoListId: todolistId2,
        order: 0,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        addedDate: '',
    }))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId2][0].title).toBe(newTaskTitle)
    expect(endState[todolistId2][0].status).toBe(TaskStatuses.New)
})

test('correct task should change its name', () => {
    const endState = tasksReducer(tasksStartState, tasksActions.changeTask(todolistId1, taskId, {title: newTaskTitle}))

    expect(endState[todolistId1][1].title).toBe(newTaskTitle)
    expect(endState[todolistId2][1].title).toBe("React Book")
})

test('correct status of task should be changed', () => {
    const endState = tasksReducer(tasksStartState, tasksActions.changeTask(todolistId1, taskId, {status}))

    expect(endState[todolistId1][0].status).toBe(TaskStatuses.Completed)
    expect(endState[todolistId1][1].status).toBe(TaskStatuses.New)
})

test('correct todolist task should be removed', () => {
    const endState = tasksReducer(tasksStartState, todolistsActions.removeTodolist(todolistId1))

    expect(Object.keys(endState).length).toBe(1)
    expect(Object.keys(endState)[0]).toBe(todolistId2)
    expect(endState[todolistId1]).toBeUndefined()
})

test('correct todolist task should be added', () => {
    const action = todolistsActions.addTodolist({
        id: newId, title: newTodolistTitle, addedDate: '', order: 0,})

    const endState = tasksReducer(tasksStartState, action)

    expect(Object.keys(endState).length).toBe(3)
    expect(Object.keys(endState)[2]).toBe(action.payload.todolist.id)
    expect(endState[action.payload.todolist.id]).toStrictEqual([])
})

test('empty arrays should be added when we set todolists', () => {
    const endState = tasksReducer({}, todolistsActions.setTodolists(todolistsStartState))

    expect(Object.keys(endState).length).toBe(2)
    expect(endState[todolistsStartState[0].id]).toStrictEqual([])
    expect(endState[todolistsStartState[1].id]).toStrictEqual([])
})

test('tasks should be added for todolist', () => {
    const endState = tasksReducer({[todolistId1]: [], [todolistId2]: []},
        tasksActions.setTasks(todolistId2, tasksStartState[todolistId2]))

    expect(endState[todolistId1].length).toBe(0)
    expect(endState[todolistId2].length).toBe(3)
})