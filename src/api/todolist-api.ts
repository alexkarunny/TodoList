import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '88c27098-d58c-439b-a5fb-d6a202fce25b'
    }
})

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CommonResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
}

export const todolistAPI = {
    getTodos() {
        return instance.get<TodoType[]>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{item: TodoType}>>('todo-lists', {title})
    },
    deleteTodo(todoId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoId}`)
    },
    updateTodo(todoId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todoId}`, {title})
    }
}