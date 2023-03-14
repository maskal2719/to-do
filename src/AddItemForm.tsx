import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, {ChangeEvent, useState} from 'react';

type AddItemFormPropsType = {
    callBack: (title: string) => void

}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)
    const maxLengthUserMessage: number = 15;
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage

    const userMaxLength = error && <div style={{color: 'red'}}>Title is required</div>
    const userErrorMessage = isUserMessageToLong && <div style={{color: 'red'}}>Task title is so long</div>
    const isAddBtnDisabled: boolean = title.length < 3 || title.length > 15

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.callBack(title)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onKeyDownAddTask = (event: React.KeyboardEvent) => {
        event.key === 'Enter' && addTask()
    }
    const changeLocalTitle = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(event.currentTarget.value)
    }


    const buttonSettingsStyle = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
    }

    return (
        <div>
            <TextField id="outlined-basic" label={error ? 'Title is requred' : 'Please enter title'} variant="outlined"
                       value={title}
                       onChange={changeLocalTitle}
                       onKeyDown={onKeyDownAddTask}
                       size={"small"}
                       error={error}
            />
            <Button
                style={buttonSettingsStyle}
                variant={'contained'}
                size={'small'}
                disabled={isAddBtnDisabled}
                onClick={() => {
                    addTask()
                }}>+
            </Button>
        </div>
    );
};
