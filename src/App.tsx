import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

const App = () => {

    const todoListTitle: string = 'What to learn';
    const tasks: Array<TaskType> = [
        {id: 1, title: 'React', isDone: false},
        {id: 2, title: 'TS', isDone: true},
        {id: 3, title: 'Redux', isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title={todoListTitle} tasks={tasks}/>
        </div>
    );
}

export default App;
