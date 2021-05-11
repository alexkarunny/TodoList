import React, {ChangeEvent} from "react";
import {filterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
            <li className={t.isDone ? "is-done" : "" } key={t.id}>
                <input onChange={changeTaskStatus}
                    type="checkbox"
                    checked={t.isDone}
                />

                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })
//const {title: dlTitle, tasks, filter, addTask, removeTask, changeFilter} = props;
    const {filter} = props;

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
            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/> <button onClick={onClickRemoveTodoList}>x</button> </h3>
            <AddItemForm addItem={addTask} />
            {/*<div>
                <input className={error  ? "error" : ""}
                    value={title} //a
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
                {errorMessage}
            </div>*/}
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={onClickAllFilters} className={filter === 'all' ? "active-filter" : ""}>All</button>
                <button onClick={onClickAActiveFilters} className={filter === 'active' ? "active-filter" : ""}>Active</button>
                <button onClick={onClickCompletedFilters} className={filter === 'completed' ? "active-filter" : ""}>Completed</button>
            </div>
        </div>
    )
}
