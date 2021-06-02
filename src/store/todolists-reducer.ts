import {filterValuesType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListID: string
}

type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListID: string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: filterValuesType
    todoListID: string
}

export type ActionUnionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListID_1 = v1()
export const todoListID_2 = v1()
let initialState: Array<TodoListType> = [
    {id: todoListID_1, title: "What to learn", filter: 'all'},
    {id: todoListID_2, title: "What to buy", filter: 'all'},
]

export const todoListsReducer = (todoLists: Array<TodoListType> = initialState, action: ActionUnionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {id: action.todoListID, title: action.title, filter: 'all'}
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {type: "REMOVE-TODOLIST", todoListID: todoListID}
}
export const AddTodolistAC = (title: string): AddTodoListAT => {
    return {type: "ADD-TODOLIST", title, todoListID: v1()}
}
export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", title, todoListID}
}
export const ChangeTodoListFilterAC = (filter: filterValuesType, todoListID: string): ChangeTodoListFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", filter, todoListID}
}

