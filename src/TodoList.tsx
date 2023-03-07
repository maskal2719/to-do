import React, {ChangeEvent, ChangeEventHandler, RefObject, useRef, useState} from 'react';
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
    title: string
    filter: FilterValueType
    tasks: Array<TaskType>
    changeFilterValue: (todolistId: string, filter: FilterValueType) => void
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    todolistId: string
    removeTodolist: (todolistId: string) => void
    updateTask: (title: string, todolistId: string, taskId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

//так же можно типизировать пропс TodoList: FC<TodoListPropsType> = (props)
const TodoList = (props: TodoListPropsType) => {

    // const [title, setTitle] = useState('')
    // const [error, setError] = useState<boolean>(false)
    // const maxLengthUserMessage: number = 15;
    // const isUserMessageToLong: boolean = title.length > maxLengthUserMessage

    // Способ с useRef
    // const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
    // const addTask = () => {
    //     if(addTaskInput.current) {
    //         props.addTask(addTaskInput.current.value)
    //         addTaskInput.current.value = ''
    //     }
    // }

    // const addTask = () => {
    //     const trimmedTitle = title.trim()
    //     if (trimmedTitle) {
    //         props.addTask(props.todolistId,title)
    //     } else {
    //         setError(true)
    //     }
    //     setTitle('')
    // }
    // const onKeyDownAddTask = (event: React.KeyboardEvent) => {
    //     event.key === 'Enter' && addTask()
    // }
    // const changeLocalTitle = (event: ChangeEvent<HTMLInputElement>) => {
    //     error && setError(false)
    //     setTitle(event.currentTarget.value)
    // }

    const handlerCreator = (filter: FilterValueType) => {
        return () => props.changeFilterValue(props.todolistId, filter)
    }

    const updateTaskHandler = (taskId: string, newTitle: string) => {
        props.updateTask(newTitle, props.todolistId, taskId)
    }

    const onChangeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }

    //Второй вариант записи креэйтора
    // const handlerCreator = (filter: FilterValueType) => () => props.changeFilterValue(filter)
    // Третий вариант с типизацией
    // const handlerCreator = (filter: FilterValuesType): () => void => (): void => props.changeFilterValue(filter)

    //Как было изначально
    // const setAllFilterValue = handlerCreator('all')
    // const setCompletedFilterValue = handlerCreator('completed')
    // const setActiveFilterValue = handlerCreator('active')


    const tasksItems = props.tasks.length
        ? props.tasks.map((task) => {
            // const taskClasses = ['task']
            // task.isDone && taskClasses.push('task-done')
            // taskClasses.join(' ')

            let taskClasses = task.isDone ? 'task task-done' : 'task';
            const removeTask = () => props.removeTask(props.todolistId, task.id)
            //onClickRemoveTaskHandler
            const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistId, task.id, event.currentTarget.checked)


            return (
                <li key={task.id}>
                    <input onChange={onChangeTaskStatusHandler} checked={task.isDone} type="checkbox"/>
                    {/*<span className={taskClasses}>{task.title}</span>*/}
                    <EditableSpan oldTitle={task.title}
                                  callBack={(newTitle: string) => updateTaskHandler(task.id, newTitle)}/>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        }) : <span>Your tasks list is empty</span>

    // const userMaxLength = error && <div style={{color: 'red'}}>Title is required</div>
    // const inputErrorMessage = error || isUserMessageToLong ? 'input-error' : ''
    // const userErrorMessage = isUserMessageToLong && <div style={{color: 'red'}}>Task title is so long</div>
    // const isAddBtnDisabled: boolean = title.length < 3 || title.length > 15
    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    return (
        <div>
            <div className='todolist'>
                <h3>
                    <EditableSpan oldTitle={props.title} callBack={onChangeTodolistTitleHandler}/>
                    <button onClick={() => props.removeTodolist(props.todolistId)}>x</button>
                </h3>
                {/*<div>*/}
                {/*    /!*Способ с useRef*!/*/}
                {/*    /!*<input ref={addTaskInput}/>*!/*/}
                {/*    /!*<button onClick={addTask}>+</button>*!/*/}

                {/*    /!*Способ с onChange*!/*/}
                {/*    <input*/}
                {/*        value={title}*/}
                {/*        onChange={changeLocalTitle}*/}
                {/*        onKeyDown={onKeyDownAddTask}*/}
                {/*        placeholder={'Please enter title'}*/}
                {/*        className={inputErrorMessage}*/}
                {/*    />*/}
                {/*    <button disabled={isAddBtnDisabled} onClick={() => {*/}
                {/*        addTask()*/}
                {/*    }}>+*/}
                {/*    </button>*/}
                {/*    {userMaxLength}*/}
                {/*    {userErrorMessage}*/}
                {/*</div>*/}
                <AddItemForm callBack={addTaskHandler}/>
                <ul>
                    {tasksItems}
                </ul>
                <div className={'filter-btn-container'}>
                    <button className={props.filter === "all" ? 'active-filter' : 'filter-btn'}
                            onClick={handlerCreator('all')}>All
                    </button>
                    <button className={props.filter === "active" ? 'active-filter' : 'filter-btn'}
                            onClick={handlerCreator('active')}>Active
                    </button>
                    <button className={props.filter === "completed" ? 'active-filter' : 'filter-btn'}
                            onClick={handlerCreator('completed')}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;