import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

type PropsType = {
    task: TaskType
    todoListID: string
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
}

export const Task = React.memo((
    {
        task,
        todoListID,
        changeTaskStatus,
        removeTask,
        changeTaskTitle
    }: PropsType) => {

    const onChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todoListID), [task.id, todoListID, changeTaskStatus])
    const onRemoveTask = useCallback(() => {
        removeTask(task.id, todoListID)
    }, [task.id, todoListID, removeTask])
    const onTitleChangeHandler = useCallback((title: string) => changeTaskTitle(task.id, title, todoListID), [task.id, todoListID, changeTaskTitle])

    return (
        <li>
                <span className={task.isDone ? "is-done" : ""}>
                    <Checkbox
                        color={'primary'}
                        onChange={onChangeTaskStatus}
                        checked={task.isDone}
                    />
                    <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
                </span>
            <IconButton onClick={onRemoveTask}>
                <Delete/>
            </IconButton>
        </li>
    )
})