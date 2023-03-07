import React, {ChangeEvent, useState} from 'react';

type EditableSpan = {
    oldTitle: string
    callBack: (title: string) => void
}

const EditableSpan = (props: EditableSpan) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)

    const editHandler = () => {
        setEdit(!edit)
        addTask()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(newTitle)
    }

    return (
        !edit ? <span onDoubleClick={editHandler}>{props.oldTitle}</span>
            : <input onBlur={editHandler} value={newTitle} autoFocus type="text" onChange={onChangeHandler}/>

    );
};

export default EditableSpan;