import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type filterValuesType = "all" | "active" | "completed"

function App() {

//BLL

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: false},
        {id: 3, title: "React", isDone: true},
        {id: 4, title: "Vue", isDone: false},
    ])

    const [filter, setFilter] = useState<filterValuesType>("all")


    function removeTask(taskID: number) {
        const filterTasks = tasks.filter(t => t.id !== taskID);
        setTasks(filterTasks);
    }

    function changeFilter(value: filterValuesType) {
        setFilter(value)
    }

//UI

    function getTasksForTodoList() {
        switch (filter) {
            case  "active":
                return tasks.filter(t => !t.isDone)
            case  "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
        /*let tasksForTodoList = tasks;
        if (filter === "active") {
            tasksForTodoList = tasks.filter(t => t.isDone === false)
        } else if (filter === "completed") {
            tasksForTodoList = tasks.filter(t => t.isDone === true)
        }
        return tasksForTodoList;*/
    }

    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={getTasksForTodoList()}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
