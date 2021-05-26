import {filterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
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

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionUnionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoListID = v1()
            const newTodoList: TodoListType = {id: newTodoListID, title: action.title, filter: 'all'}
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