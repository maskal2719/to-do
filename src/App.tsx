import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container} from "@mui/material";

//crud
//R - filter, sort, search

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

const App = () => {
    //Business logic layer
    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'Html', isDone: true},
            {id: v1(), title: 'Css', isDone: true},
            {id: v1(), title: 'Js', isDone: false},
            {id: v1(), title: 'Ts', isDone: false},
            {id: v1(), title: 'Angular', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Яйца', isDone: true},
            {id: v1(), title: 'Хлеб', isDone: true},
            {id: v1(), title: 'Картофель', isDone: false},
            {id: v1(), title: 'Гречка', isDone: false},
            {id: v1(), title: 'Мясо', isDone: true},
            {id: v1(), title: 'Рыба', isDone: false},
            {id: v1(), title: 'Овощи', isDone: false},
        ],
    })

    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: 'React', isDone: false},
    //     {id: v1(), title: 'TS', isDone: true},
    //     {id: v1(), title: 'Redux', isDone: false}
    // ])

    const changeFilterValue = (todolistId:string, filter: FilterValueType) => {
        setTodolists(todolists.map((el) => el.id === todolistId ? {...el, filter} : el));
    }
    const removeTask = (todolistId: string,id: string) => {
        // const updateTasks = tasks.filter(task => task.id !== id);
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id )})
    }
    const addTask = (todolistId: string, title: string) => {
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId] : [newTask,...tasks[todolistId]]})
    }
    // const changeTaskStatus = (id: string) => {
    //     setTasks(tasks.map(el => el.id === id ? {...el, isDone: !el.isDone} : el))
    // }
    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        // tasks.map(el => el.id === id ? {...el, isDone: !el.isDone} : el)
        setTasks({...tasks, [todolistId] : tasks[todolistId].map(el => el.id == id ? {...el,isDone} : el)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(td => td.id !== todolistId))
        delete tasks[todolistId]
    }

    const addTodolist = (newTitle: string) => {
        const newId = v1()
        let newTodoList: TodolistsType = {id:newId, title: newTitle, filter: 'all'}
        setTodolists([newTodoList, ...todolists])
        setTasks({...tasks, [newId] : []})
    }

    const updateTask = (title: string, todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el=> el.id === taskId ?  {...el, id: taskId, title: title} : el )});
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }



    return (
        <div className="App">
            <ButtonAppBar/>

            <AddItemForm callBack={addTodolist}/>

            {todolists.map(el => {

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

                let filterTasks: Array<TaskType> = getFilteredTasks(tasks[el.id], el.filter)

                return (
                    <TodoList
                        key={el.id}
                        filter={el.filter}
                        title={el.title}
                        tasks={filterTasks}
                        changeFilterValue={changeFilterValue}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        todolistId={el.id}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}
                <Container/>
        </div>
    );
}

export default App;
