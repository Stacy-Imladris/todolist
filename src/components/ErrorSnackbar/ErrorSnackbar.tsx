import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useActions, useAppSelector} from '../../store/store';
import {selectAppError} from '../../app/selectors';
import {appActions} from '../../app';
import {forwardRef, SyntheticEvent} from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref,) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

export function ErrorSnackbar() {
    const error = useAppSelector(selectAppError)
    const {setAppError} = useActions(appActions)

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setAppError({error: null})
    }

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}