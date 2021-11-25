import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, setTodolistsAC} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, TodolistType, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

type ActionsType =
    | RemoveTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof fetchTasksAC>
    | ReturnType<typeof addTaskAC>

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS":
            const stateCopy2 = {...state}
            stateCopy2[action.todoId] = action.tasks
            return stateCopy2

        case "SET-TODOLISTS":
            const stateCopy1 = {...state}
            action.todos.forEach((todo: TodolistType) => {
                stateCopy1[todo.id] = []
            })
            return stateCopy1

        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const fetchTasksAC = (todoId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        todoId,
        tasks
    } as const
}

export const fetchTasksTC = (todoId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todoId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(fetchTasksAC(todoId, tasks))
            })
    }
}
export const removeTaskTC = (todoId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todoId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todoId))
            })
    }
}
export const addTaskTC = (title: string, todoId: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todoId, title)
        .then((res) => {
            debugger
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskStatus = (todoId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState()
    const allTasks = state.tasks
    const allTasksForClickedTodo = allTasks[todoId]
    const clickedTask = allTasksForClickedTodo.find((task) => task.id === taskId)
    if (clickedTask) {
        const model: UpdateTaskModelType = {
            title: clickedTask.title,
            status: status,
            description: clickedTask.description,
            priority: clickedTask.priority,
            startDate: clickedTask.startDate,
            deadline: clickedTask.deadline
        }

        todolistsAPI.updateTask(todoId, taskId, model)
            .then((res) => {
                debugger
                dispatch(changeTaskStatusAC(taskId, status, todoId))
            })
    }

}