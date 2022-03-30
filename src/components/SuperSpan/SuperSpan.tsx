import {ChangeEvent, FocusEvent, KeyboardEvent, memo, useState} from 'react';
import {TextField} from '@mui/material';

type SuperSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}
export const SuperSpan = memo((props: SuperSpanPropsType) => {
    console.log('SuperSpan')
    const [title, setTitle] = useState<string>(props.title)
    const [temp, setTemp] = useState<string>(props.title)
    const [input, setInput] = useState<boolean>(false)
    const [error, setError] = useState<string>('Change title')

    const inputOn = () => {
        setTemp(title)
        setInput(true)
    }
    const inputOff = () => {
        setInput(false)
        if (error === "Title is incorrect") {
            setTitle(temp)
            setError('Change title')
        } else {
            let trTitle = title.trim()
            if (trTitle) {
                props.changeTitle(trTitle)
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
        : <span onDoubleClick={inputOn}>{props.title}</span>
})