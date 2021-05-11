import React, {ChangeEvent} from "react";
import {filterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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

export function TodoList(props: TodoListPropsType) {


   // const [title, setTitle] = useState('')
  //  const [error, setError] = useState<boolean>(false)

    const tasksJSX = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.todoListID)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)
        return (
            <li  key={t.id}>
                <span className={t.isDone ? "is-done" : "" }>
                    <Checkbox
                        color={'primary'}
                        onChange={changeTaskStatus}
                        checked={t.isDone}
                    />
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                </span>
                <IconButton onClick={removeTask}>
                    <Delete />
                </IconButton>
            </li>
        )
    })
//const {title: dlTitle, tasks, filter, addTask, removeTask, changeFilter} = props;
    const {filter} = props; //деструктуризация пропс

    /*const onChangeTitle = (e: ChangeEvent<HTMLInputElement> ) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }*/

    const onClickAllFilters = () => props.changeFilter("all", props.todoListID);
    const onClickAActiveFilters = () => props.changeFilter("active", props.todoListID);
    const onClickCompletedFilters = () => props.changeFilter("completed", props.todoListID);
    const onClickRemoveTodoList = () => props.removeTodoList(props.todoListID)
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }
    const addTask = (title: string) => props.addTask(title, props.todoListID)
   // const errorMessage = error ? <div className={"error-message"}>title is required</div> : null

    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />

            <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
                {tasksJSX}
            </ul>
            <div>

                <Button variant={filter === "all" ? "contained" : "outlined"} size={'small'} color={'primary'} onClick={onClickAllFilters} >All</Button>
                <Button variant={filter === "active" ? "contained" : "outlined"} size={'small'} color={'primary'} onClick={onClickAActiveFilters} className={filter === 'active' ? "active-filter" : ""}>Active</Button>
                <Button variant={filter === "completed" ? "contained" : "outlined"} size={'small'} color={'primary'} onClick={onClickCompletedFilters} className={filter === 'completed' ? "active-filter" : ""}>Completed</Button>
            </div>
        </div>
    )
}
