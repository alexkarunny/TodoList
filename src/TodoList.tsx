import React, {useCallback} from "react";
import {filterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


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
    const tasksJSX = filteredTasks.map(task => {
        return (
            <Task key={task.id + task.title}
                  task={task}
                  changeTaskStatus={props.changeTaskStatus}
                  todoListID={props.todoListID}
                  removeTask={props.removeTask}
                  changeTaskTitle={props.changeTaskTitle}/>
        )
    })

    const {filter} = props; //деструктуризация пропс

    const onClickAllFilters = useCallback(() => props.changeFilter("all", props.todoListID), [props.changeFilter, props.todoListID]);
    const onClickAActiveFilters = useCallback(() => props.changeFilter("active", props.todoListID), [props.changeFilter, props.todoListID]);
    const onClickCompletedFilters = useCallback(() => props.changeFilter("completed", props.todoListID), [props.changeFilter, props.todoListID]);

    const onClickRemoveTodoList = useCallback(() => props.removeTodoList(props.todoListID), [props.removeTodoList, props.todoListID])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }, [props.todoListID, props.changeTodoListTitle])
    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [props.addTask, props.todoListID])

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
