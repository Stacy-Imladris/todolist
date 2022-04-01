import {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Fab, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type SuperInputPropsType = {
    addHandler: (title: string) => void
    disabled?: boolean
}

export const SuperInput = memo((props: SuperInputPropsType) => {
    console.log('SuperInput')
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('Enter title')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === ' ' || e.currentTarget.value === '') {
            setError('Title is incorrect')
            setTitle('')
        } else {
            setTitle(e.currentTarget.value)
            setError('Title is correct')
        }
    }
    const addHandler = () => {
        let trTitle = title.trim()
        if (trTitle) {
            props.addHandler(trTitle)
            setTitle('')
            setError('Enter title')
        } else {
            setError('Title is incorrect')
        }
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addHandler()
            setTitle('')
        }
    }

    return (
        <div>
            <TextField disabled={props.disabled}
                       error={error === 'Title is incorrect'}
                       id="outlined-basic"
                       label={error} variant="outlined"
                       onChange={onChangeHandler}
                       onKeyPress={onKeyHandler}
                       value={title}/>
            <Fab color="primary" onClick={addHandler} size="large"
                 style={{marginLeft: '10px'}} disabled={props.disabled}>
                <AddIcon/>
            </Fab>
        </div>
    );
})