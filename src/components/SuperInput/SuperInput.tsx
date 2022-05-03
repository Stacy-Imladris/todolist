import {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Fab, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type SuperInputPropsType = {
    addHandler: (title: string) => void
    disabled?: boolean
}

export const SuperInput = memo(({addHandler, disabled}: SuperInputPropsType) => {
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
    const onClickAddHandle = () => {
        let trTitle = title.trim()
        if (trTitle) {
            addHandler(trTitle)
            setTitle('')
            setError('Enter title')
        } else {
            setError('Title is incorrect')
        }
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddHandle()
            setTitle('')
        }
    }

    return (
        <div>
            <TextField disabled={disabled}
                       error={error === 'Title is incorrect'}
                       id="outlined-basic"
                       label={error} variant="outlined"
                       onChange={onChangeHandler}
                       onKeyPress={onKeyHandler}
                       value={title}/>
            <Fab color="primary" onClick={onClickAddHandle} size="large"
                 style={{marginLeft: '10px'}} disabled={disabled}>
                <AddIcon/>
            </Fab>
        </div>
    )
})