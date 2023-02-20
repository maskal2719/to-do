import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

//crud
//R - filter, sort, search

export type FilterValueType = 'all' | 'active' | 'completed';

const App = () => {
    //Business logic layer
    const todoListTitle: string = 'What to learn';

    const [filter, setFilter] = useState<FilterValueType>('all');

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'TS', isDone: true},
        {id: v1(), title: 'Redux', isDone: false}
    ])

    const changeFilterValue = (filter: FilterValueType) => {
        setFilter(filter);
    }
    const removeTask = (id: string) => {
        const updateTasks = tasks.filter(task => task.id !== id);
        setTasks(updateTasks)
    }
    const addTask = (title: string) => {
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const updatedTasks: TaskType[] = [newTask, ...tasks]
        setTasks(updatedTasks)
    }
    // const changeTaskStatus = (id: string) => {
    //     setTasks(tasks.map(el => el.id === id ? {...el, isDone: !el.isDone} : el))
    // }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(el => el.id === id ? {...el, isDone: !el.isDone} : el))
    }

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValueType): TaskType[] => {
        switch (filter) {
            case 'active' :
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default :
                return tasks
        }
    }

    let filterTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    return (
        <div className="App">
            <TodoList
                filter={filter}
                title={todoListTitle}
                tasks={filterTasks}
                changeFilterValue={changeFilterValue}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
