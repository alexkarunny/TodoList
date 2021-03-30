import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    const tasksToLearn: Array<TaskType> =  [
        {id: 1, title: "HTML", isDone: false},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "React", isDone: true},
    ]

    const tasksToBuy: Array<TaskType> = [
        {id: 4, title: "Milk", isDone: false},
        {id: 5, title: "Sugar", isDone: false},
        {id: 6, title: "Strawberry", isDone: true},
    ]



    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={tasksToLearn}/>
            <TodoList title={"What to buy"} tasks={tasksToBuy}/>
        </div>
    );
}

export default App;
