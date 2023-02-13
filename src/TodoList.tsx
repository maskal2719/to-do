import React, {ChangeEvent, ChangeEventHandler, RefObject, useRef, useState} from 'react';
import {FilterValueType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    changeFilterValue: (filter: FilterValueType) => void
    removeTask: (id: string) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

//так же можно типизировать пропс TodoList: FC<TodoListPropsType> = (props)
const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState('')

    // Способ с useRef
    // const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
    // const addTask = () => {
    //     if(addTaskInput.current) {
    //         props.addTask(addTaskInput.current.value)
    //         addTaskInput.current.value = ''
    //     }
    // }

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        }
        setTitle('')
    }
    const onKeyDownAddTask = (event : React.KeyboardEvent) => {
        event.key === 'Enter' && addTask()
    }
    const changeLocalTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const setAllFilterValue = () => props.changeFilterValue('all')
    const setCompletedFilterValue = () => props.changeFilterValue('completed')
    const setActiveFilterValue = () => props.changeFilterValue('active')

    const tasksItems = props.tasks.length
        ? props.tasks.map((task) => {
            const removeTask = () => {
                props.removeTask(task.id)
            }

            return (
                <li key={task.id}>
                    <input defaultChecked={task.isDone} type="checkbox"/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        }) : <span>Your tasks list is empty</span>

    return (
        <div>
            <div className='todolist'>
                <h3>{props.title}</h3>
                <div>
                    {/*Способ с useRef*/}
                    {/*<input ref={addTaskInput}/>*/}
                    {/*<button onClick={addTask}>+</button>*/}

                    {/*Способ с onChange*/}
                    <input
                        value={title}
                        onChange={changeLocalTitle}
                        onKeyDown={onKeyDownAddTask}
                    />
                    <button disabled={title.length < 3 || title.length > 15} onClick={() => {
                        addTask()
                    }}>Add task
                    </button>
                    {title.length > 15 && <div style={{color: 'red'}}>Task title is so long</div>}
                </div>
                <ul>
                    {tasksItems}
                </ul>
                <div>
                    <button onClick={setAllFilterValue}>All</button>
                    <button onClick={setActiveFilterValue}>Active</button>
                    <button onClick={setCompletedFilterValue}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;