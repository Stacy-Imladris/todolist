import {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {TextField} from '@mui/material';

type SuperSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const SuperSpan = memo(({title, changeTitle}: SuperSpanPropsType) => {
    const [value, setValue] = useState<string>(title)
    const [temp, setTemp] = useState<string>(title)
    const [input, setInput] = useState<boolean>(false)
    const [error, setError] = useState<string>('Change title')

    const inputOn = () => {
        setTemp(value)
        setInput(true)
    }

    const inputOff = () => {
        setInput(false)
        if (error === "Title is incorrect") {
            setValue(temp)
            setError('Change title')
        } else {
            let trTitle = title.trim()
            if (trTitle) {
                changeTitle(trTitle)
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
        : <span onDoubleClick={inputOn}>{title}</span>
})