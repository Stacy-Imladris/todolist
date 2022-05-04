import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../../api/todolists-api';
import {todolistsStartState} from './todolists-reducer.test';
import {
    createTask,
    deleteTask, fetchTasks,
    tasksReducer,
    TasksStateType,
    updateTask
} from './tasks-reducer';
import {createTodolist, deleteTodolist, fetchTodolists} from './todolists-reducer';

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
    const action = deleteTask.fulfilled({Tid: todolistId1, taskId}, 'requestId', {Tid: todolistId1, taskId})
    const endState = tasksReducer(tasksStartState, action)

    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId1].every(t => t.id !== taskId)).toBeTruthy()
    expect(endState[todolistId1][0].title).toBe("HTML&CSS")
    expect(endState[todolistId1][1].title).not.toBe("JS")
})

test('correct task should be added', () => {
    const action = createTask.fulfilled({task: {
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
        }}, 'requestId', {Tid: todolistId2, title: newTaskTitle})
    const endState = tasksReducer(tasksStartState, action)

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][0].id).toBeDefined()
    expect(endState[todolistId2][0].title).toBe(newTaskTitle)
    expect(endState[todolistId2][0].status).toBe(TaskStatuses.New)
})

test('correct task should change its name', () => {
    const updateModel = { Tid: todolistId1, taskId, domainModel: {title: newTaskTitle} }
    const action = updateTask.fulfilled(updateModel, 'requestId', updateModel)
    const endState = tasksReducer(tasksStartState, action)

    expect(endState[todolistId1][1].title).toBe(newTaskTitle)
    expect(endState[todolistId2][1].title).toBe("React Book")
})

test('correct status of task should be changed', () => {
    const updateModel = { Tid: todolistId1, taskId, domainModel: {status} }
    const action = updateTask.fulfilled(updateModel, 'requestId', updateModel)
    const endState = tasksReducer(tasksStartState, action)

    expect(endState[todolistId1][0].status).toBe(TaskStatuses.Completed)
    expect(endState[todolistId1][1].status).toBe(TaskStatuses.New)
})

test('correct todolist task should be removed', () => {
    const action = deleteTodolist.fulfilled({Tid: todolistId1}, 'requestId', todolistId1)
    const endState = tasksReducer(tasksStartState, action)

    expect(Object.keys(endState).length).toBe(1)
    expect(Object.keys(endState)[0]).toBe(todolistId2)
    expect(endState[todolistId1]).toBeUndefined()
})

test('empty array to correct todolist should be added when we add todolist', () => {
    const action = createTodolist.fulfilled({todolist: {
            id: newId, title: newTodolistTitle, addedDate: '', order: 0,}}, 'requestId', newTodolistTitle)
    const endState = tasksReducer(tasksStartState, action)

    expect(Object.keys(endState).length).toBe(3)
    expect(Object.keys(endState)[2]).toBe(action.payload.todolist.id)
    expect(endState[action.payload.todolist.id]).toStrictEqual([])
})

test('empty arrays should be added when we set todolists', () => {
    const action = fetchTodolists.fulfilled({todolists: todolistsStartState}, 'requestId')
    const endState = tasksReducer({}, action)

    expect(Object.keys(endState).length).toBe(2)
    expect(endState[todolistsStartState[0].id]).toStrictEqual([])
    expect(endState[todolistsStartState[1].id]).toStrictEqual([])
})

test('tasks should be added for todolist', () => {
    const action = fetchTasks.fulfilled({Tid: todolistId2, tasks: tasksStartState[todolistId2]}, 'requestId', todolistId2)
    const endState = tasksReducer({[todolistId1]: [], [todolistId2]: []}, action)

    expect(endState[todolistId1].length).toBe(0)
    expect(endState[todolistId2].length).toBe(3)
})