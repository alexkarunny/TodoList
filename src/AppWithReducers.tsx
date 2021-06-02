import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer} from "./store/tasks-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: filterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type filterValuesType = "all" | "active" | "completed"

function AppWithReducers() {

//BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchToTodoList] = useReducer(todoListsReducer, [
        {id: todoListID_1, title: "What to learn", filter: 'all'},
        {id: todoListID_2, title: "What to buy", filter: 'all'},
    ])

    const [tasks, dispatchToTask] = useReducer(tasksReducer,{
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "React", isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Bread", isDone: false}
        ]
    })

    function removeTask(taskID: string, todoListID: string) {
        dispatchToTask(removeTasksAC(taskID, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTask(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        dispatchToTask(changeTaskStatusAC(taskID, newIsDoneValue, todoListID))
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        dispatchToTask(changeTaskTitleAC(taskID, newTitle, todoListID))
    }

    //todoLists
    function changeTodoListTitle(title: string, todoListID: string) {
        dispatchToTodoList(ChangeTodoListTitleAC(title, todoListID ))
    }

    function changeFilter(value: filterValuesType, todoListID: string) {
        dispatchToTodoList(ChangeTodoListFilterAC(value, todoListID))
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID)
        dispatchToTodoList(action)
        dispatchToTask(action)
    }

    function addTodoList(title: string) {
        let action = AddTodolistAC(title)
        dispatchToTodoList(action)
        dispatchToTask(action)
    }

//UI

    function getTasksForTodoList(todoList: TodoListType) {
        switch (todoList.filter) {
            case  "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case  "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
        /*let tasksForTodoList = tasks;
        if (filter === "active") {
            tasksForTodoList = tasks.filter(t => t.isDone === false)
        } else if (filter === "completed") {
            tasksForTodoList = tasks.filter(t => t.isDone === true)
        }
        return tasksForTodoList;*/
    }

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: '20px'}}>
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={getTasksForTodoList(tl)}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeFilter={changeFilter}
                        filter={tl.filter}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (

        <div>
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton color={'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolists
                    </Typography>
                    <Button color={'inherit'}
                            variant={'outlined'}
                    >Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithReducers;
