import React from 'react';
import {FilterValueType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    changeFilterValue: (filter: FilterValueType) => void
    removeTask: (id: number) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

//так же можно типизировать пропс TodoList: FC<TodoListPropsType> = (props)
const TodoList = (props: TodoListPropsType) => {

    const tasksItems = props.tasks.length
        ? props.tasks.map((task) => {
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>x</button>
                </li>
            )
        }) : <span>Your tasks list is empty</span>

    return (
        <div>
            <div className='todolist'>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksItems}
                </ul>
                <div>
                    <button onClick={() => props.changeFilterValue('all')}>All</button>
                    <button onClick={() => props.changeFilterValue('active')}>Active</button>
                    <button onClick={() => props.changeFilterValue('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;