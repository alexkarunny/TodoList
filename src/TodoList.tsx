import React, {ChangeEvent, useCallback} from "react";
import {filterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TodoListType} from "./AppWithRedux";


type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: filterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: filterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {
    console.log('todolist')

    function getTasksForTodoList() {
        switch (props.filter) {
            case  "active":
                return props.tasks.filter(t => !t.isDone)
            case  "completed":
                return props.tasks.filter(t => t.isDone)
            default:
                return props.tasks
        }
    }

    const filteredTasks = getTasksForTodoList()

    const tasksJSX = filteredTasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.todoListID)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)
        return (
            <li key={t.id}>
                <span className={t.isDone ? "is-done" : ""}>
                    <Checkbox
                        color={'primary'}
                        onChange={changeTaskStatus}
                        checked={t.isDone}
                    />
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                </span>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    const {filter} = props; //деструктуризация пропс

    const onClickAllFilters = () => props.changeFilter("all", props.todoListID);
    const onClickAActiveFilters = () => props.changeFilter("active", props.todoListID);
    const onClickCompletedFilters = () => props.changeFilter("completed", props.todoListID);
    const onClickRemoveTodoList = () => props.removeTodoList(props.todoListID)
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }
    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [])

    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
                {tasksJSX}
            </ul>
            <div>

                <Button variant={filter === "all" ? "contained" : "outlined"} size={'small'} color={'primary'}
                        onClick={onClickAllFilters}>All</Button>
                <Button variant={filter === "active" ? "contained" : "outlined"} size={'small'} color={'primary'}
                        onClick={onClickAActiveFilters}
                        className={filter === 'active' ? "active-filter" : ""}>Active</Button>
                <Button variant={filter === "completed" ? "contained" : "outlined"} size={'small'} color={'primary'}
                        onClick={onClickCompletedFilters}
                        className={filter === 'completed' ? "active-filter" : ""}>Completed</Button>
            </div>
        </div>
    )
})
