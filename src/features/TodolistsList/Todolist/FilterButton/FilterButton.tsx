import {FilterValuesType} from 'features/TodolistsList/todolists-reducer';
import {Button} from '@mui/material';

type FilterButtonPropsType = {
    onClick: (filter: FilterValuesType) => void
    currentFilter: FilterValuesType
    filter: FilterValuesType
}
export const FilterButton = ({onClick, currentFilter, filter}: FilterButtonPropsType) => {
    const onClickHandle = () => onClick(filter)

    return <Button variant={currentFilter === filter ? 'contained' : 'outlined'}
                   onClick={onClickHandle}>{filter}</Button>
}