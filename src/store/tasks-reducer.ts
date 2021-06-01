import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    taskID: string
    todoListID: string
}

export type AddTaskActionType = {
    type: 'ADD_TASK'
    title: string
    todoListID: string
}
export type ChangeTaskStatusType = {
    type: 'CHANGE_STATUS'
    taskID: string
    newIsDoneValue: boolean
    todoListID: string
}
export type ChangeTaskTitleType = {
    type: 'CHANGE_TITLE'
    taskID: string
    newTitle: string
    todoListID: string
}

export type ActionUnionType =
    AddTodoListAT
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | RemoveTodoListAT
export const tasksReducer = (state: TaskStateType, action: ActionUnionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID)
            }

        case "ADD_TASK":
            let task: TaskType = {id: v1(), isDone: false, title: action.title}
            return {
                ...state,
                [action.todoListID]: [task, ...state[action.todoListID]]
            }
        case "CHANGE_STATUS":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .map(task => {
                            if (task.id === action.taskID) {
                                return {...task, isDone: action.newIsDoneValue}
                            } else return task
                        }
                    )
            }
        case "CHANGE_TITLE":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID]
                    .map(task => {
                            if (task.id === action.taskID) {
                                return {...task, title: action.newTitle}
                            } else return task
                        }
                    )
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoListID]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState


    }
}

export const removeTasksAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', taskID, todoListID}
}
export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: 'ADD_TASK', title, todoListID}
}
export const changeTaskStatusAC = (taskID: string, newIsDoneValue: boolean, todoListID: string): ChangeTaskStatusType => {
    return {type: 'CHANGE_STATUS', taskID, newIsDoneValue, todoListID}
}
export const changeTaskTitleAC = (taskID: string, newTitle: string, todoListID: string): ChangeTaskTitleType => {
    return {type: 'CHANGE_TITLE', taskID, newTitle, todoListID}
}
