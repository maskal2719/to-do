import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

//crud
//R - filter, sort, search

export type FilterValueType = 'all' | 'active' | 'completed';

const App = () => {
    //Business logic layer
    const todoListTitle: string = 'What to learn';

    const [filter, setFilter] = useState<FilterValueType>('all');

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'React', isDone: false},
        {id: 2, title: 'TS', isDone: true},
        {id: 3, title: 'Redux', isDone: false}
    ])

    const changeFilterValue = (filter: FilterValueType) => {
        setFilter(filter);
    }
    const removeTask = (id: number) => {
        const updateTasks = tasks.filter(task => task.id !== id);
        setTasks(updateTasks)
    }

    let filterTasks: Array<TaskType> = [];
    if (filter === 'all') {
        filterTasks = tasks
    }

    if (filter === 'active') {
        filterTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filterTasks = tasks.filter(task => task.isDone)
    }

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filterTasks}
                changeFilterValue={changeFilterValue}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
