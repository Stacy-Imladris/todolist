import React, {ChangeEvent, useState} from "react";

type SuperSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}
export const SuperSpan = React.memo((props: SuperSpanPropsType) => {
    console.log('SuperSpan')
    const [title, setTitle] = useState<string>(props.title)
    const [input, setInput] = useState<boolean>(false)

    const inputOn = () => {
        setInput(true)
    }
    const inputOff = () => {
        setInput(false)
        props.changeTitle(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return input
        ? <input autoFocus value={title} onBlur={inputOff} onChange={onChangeHandler}/>
        : <span onDoubleClick={inputOn}>{props.title}</span>
})