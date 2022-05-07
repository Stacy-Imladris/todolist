import {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {TextField} from '@mui/material';
import {RequestStatusType} from '../../app/app-reducer';

type SuperSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    entityStatus?: RequestStatusType
}
export const SuperSpan = memo(({changeTitle, entityStatus, title}: SuperSpanPropsType) => {
    const [value, setValue] = useState<string>(title)
    const [temp, setTemp] = useState<string>(title)
    const [input, setInput] = useState<boolean>(false)
    const [error, setError] = useState<string>('Change title')

    const inputOn = () => {
        if (entityStatus !== 'loading') {
            setTemp(value)
            setInput(true)
        }
    }
    const inputOff = () => {
        setInput(false)
        if (error === "Title is incorrect") {
            setValue(temp)
            setError('Change title')
        } else {
            let trimmedTitle = value.trim()
            if (trimmedTitle) {
                changeTitle(trimmedTitle)
            }
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === " " || e.currentTarget.value === '') {
            setError('Title is incorrect')
            setValue('')
        } else {
            setValue(e.currentTarget.value)
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
                     value={value}/>
        : <span onDoubleClick={inputOn} style={{wordBreak: 'break-all'}}>{title}</span>
})