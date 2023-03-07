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
    const inputErrorMessage = error || isUserMessageToLong ? 'input-error' : ''
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



    return (
        <div>
            <input
                value={title}
                onChange={changeLocalTitle}
                onKeyDown={onKeyDownAddTask}
                placeholder={'Please enter title'}
                className={inputErrorMessage}
            />
            <button disabled={isAddBtnDisabled} onClick={() => {
                addTask()
            }}>+
            </button>
            {userMaxLength}
            {userErrorMessage}
        </div>
    );
};
