import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";


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

function AppWithRedux() {

//BLL


    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)

    const dispatch = useDispatch()

    function removeTask(taskID: string, todoListID: string) {
        dispatch(removeTasksAC(taskID, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID))
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskID, newIsDoneValue, todoListID))
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskID, newTitle, todoListID))
    }

    //todoLists
    function changeTodoListTitle(title: string, todoListID: string) {
        dispatch(ChangeTodoListTitleAC(title, todoListID ))
    }

    function changeFilter(value: filterValuesType, todoListID: string) {
        dispatch(ChangeTodoListFilterAC(value, todoListID))
    }

    function removeTodoList(todoListID: string) {
        dispatch(RemoveTodoListAC(todoListID))
    }

    function addTodoList(title: string) {
        dispatch(AddTodolistAC(title))

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

    const todoListsComponents = todolists.map(tl => {
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

export default AppWithRedux;
