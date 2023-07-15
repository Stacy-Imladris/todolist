import {memo, useCallback} from 'react';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useActions, useAppSelector} from 'store/store';
import {Task, tasksAsyncActions, todolistsActions, todolistsAsyncActions} from '../index';
import {TaskStatuses} from 'enums';
import {SuperInput, SuperSpan} from 'components';
import {FilterValuesType} from 'features/TodolistsList/todolists-reducer';
import {FilterButton} from './FilterButton/FilterButton';
import {filterValues} from 'enums';
import s from './Todolist.module.css'

const filterButtons: FilterValuesType[] = [
    filterValues.all,
    filterValues.active,
    filterValues.completed
]

type TodolistPropsType = {
    Tid: string
}

export const Todolist = memo(({Tid}: TodolistPropsType) => {
    const {
        title,
        filter,
        entityStatus
    } = useAppSelector(state => state.todolists.filter(tl => tl.id === Tid)[0])
    const tasks = useAppSelector(state => state.tasks[Tid])
    const {
        createTask,
        deleteTodolist,
        updateTodolistTitle,
        changeTodolistFilter
    } = useActions({
        ...tasksAsyncActions, ...todolistsAsyncActions, ...todolistsActions
    })

    const removeTodolist = useCallback(() => deleteTodolist(Tid), [Tid])

    const changeTodolistTitle = useCallback((title: string) =>
        updateTodolistTitle({Tid, title}), [Tid])

    const onClickChangeFilter = useCallback((filter: FilterValuesType) =>
        changeTodolistFilter({Tid, filter}), [Tid])

    const addTask = useCallback((title: string) => createTask({Tid, title}), [Tid])

    let todolistTasks = tasks
    if (filter === filterValues.active) {
        todolistTasks = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === filterValues.completed) {
        todolistTasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <>
        <IconButton size="small" onClick={removeTodolist} style={{float: 'right'}}
                    disabled={entityStatus === 'loading'}>
            <DeleteIcon fontSize="inherit"/>
        </IconButton>
        <h3 className={s.title}>
            <SuperSpan title={title} changeTitle={changeTodolistTitle}
                       entityStatus={entityStatus}/>
        </h3>
        <SuperInput addHandler={addTask} disabled={entityStatus === 'loading'}/>
        <div>
            {todolistTasks.length
                ? todolistTasks.map(({id}) => <Task key={id} taskId={id} Tid={Tid}/>)
                : <div className={s.empty}>
                    <div>No tasks yet.</div>
                    <div>You can create the first one</div>
                </div>
            }
        </div>
        <div className={s.buttonBox}>
            {filterButtons.map(value => <FilterButton key={value} filter={value}
                                                      onClick={onClickChangeFilter}
                                                      currentFilter={filter}/>)}
        </div>
    </>
})

