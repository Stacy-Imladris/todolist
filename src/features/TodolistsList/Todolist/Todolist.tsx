import {memo, useCallback} from 'react';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useActions, useAppSelector} from '../../../store/store';
import {Task, tasksAsyncActions, todolistsActions, todolistsAsyncActions} from '../index';
import {TaskStatuses} from '../../../enums/taskStatuses';
import {SuperInput, SuperSpan} from '../../../components';
import {FilterValuesType} from '../todolists-reducer';
import {FilterButton} from './FilterButton/FilterButton';

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
    } = useActions({...tasksAsyncActions, ...todolistsAsyncActions, ...todolistsActions})

    const removeTodolist = useCallback(() => deleteTodolist(Tid), [Tid])

    const changeTodolistTitle = useCallback((title: string) =>
        updateTodolistTitle({Tid, title}), [Tid])

    const onClickChangeTodolistFilter = useCallback((filter: FilterValuesType) =>
        changeTodolistFilter({Tid, filter}), [Tid])

    const addTask = useCallback((title: string) => createTask({Tid, title}), [Tid])

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3 style={{textAlign: 'center'}}>
                <SuperSpan title={title} changeTitle={changeTodolistTitle}/>
                <IconButton size="small" onClick={removeTodolist}
                            disabled={entityStatus === 'loading'}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
            <SuperInput addHandler={addTask} disabled={entityStatus === 'loading'}/>
            <div>
                {tasksForTodolist.map(({id}) => <Task key={id} taskId={id} Tid={Tid}/>)}
            </div>
            <div style={{marginTop: '5px'}}>
                <FilterButton onClick={onClickChangeTodolistFilter}
                              currentFilter={filter} filter={'all'}/>
                <FilterButton onClick={onClickChangeTodolistFilter}
                              currentFilter={filter} filter={'active'}/>
                <FilterButton onClick={onClickChangeTodolistFilter}
                              currentFilter={filter} filter={'completed'}/>
            </div>
        </div>
    )
})

