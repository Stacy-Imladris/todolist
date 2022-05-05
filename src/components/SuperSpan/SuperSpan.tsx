import {ChangeEvent, FocusEvent, KeyboardEvent, memo, useState} from 'react';
import {TextField} from '@mui/material';
import {RequestStatusType} from '../../app/app-reducer';
import {useAppSelector} from '../../store/store';
import {selectAppError} from '../../app/selectors';

type SuperSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    entityStatus?: RequestStatusType
}
export const SuperSpan = memo(({changeTitle, entityStatus, ...restProps}: SuperSpanPropsType) => {
    const [title, setTitle] = useState<string>(restProps.title)
    const [temp, setTemp] = useState<string>(restProps.title)
    const [input, setInput] = useState<boolean>(false)
    const [error, setError] = useState<string>('Change title')

    const inputOn = () => {
        if (entityStatus !== 'loading') {
            setTemp(title)
            setInput(true)
        }
    }
    const inputOff = () => {
        setInput(false)
        if (error === "Title is incorrect") {
            setTitle(temp)
            setError('Change title')
        } else {
            let trimmedTitle = title.trim()
            if (trimmedTitle) {
                changeTitle(trimmedTitle)
            }
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === " " || e.currentTarget.value === '') {
            setError('Title is incorrect')
            setTitle('')
        } else {
            setTitle(e.currentTarget.value)
            setError('Title is correct')
        }
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            inputOff()
        }
    }

    return input
        ? <TextField error={error === 'Title is incorrect'}
                     id="standard-basic"
                     label={error}
                     variant="standard"
                     onChange={onChangeHandler}
                     onKeyPress={onKeyHandler}
                     onBlur={inputOff}
                     autoFocus
                     value={title}/>
        : <span onDoubleClick={inputOn}>{restProps.title}</span>
})