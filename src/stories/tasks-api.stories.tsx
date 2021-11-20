import React, {useEffect, useState} from 'react'
import {taskAPI, UpdatedTaskType} from "../api/task-api";

export default {
    title: 'API-TASKS'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.getTasks('7966428f-ae4b-4e12-b3c5-dfb9f7ae5b05')
            .then((res) => {
                setState(res.data.items)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        taskAPI.createTask(taskId, title)
            .then((res) => {
                setState(res.data.data)
            })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <input type="text" value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
        <input type="text" value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
        <button onClick={createTask} >Create</button>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.deleteTask('e96e0812-99f9-4e70-9009-4f88812243f4', 'c91f27ac-6a8d-498a-9df0-5804538e5a6e')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let updateTask: UpdatedTaskType = {
            title: 'HTML',
            completed: false,
            deadline: '2021-11-12T11:35:27.943',
            description: 'null',
            priority: 1,
            startDate: '2021-11-12T11:35:27.943',
            status: 0
        }
        taskAPI.updateTask('7966428f-ae4b-4e12-b3c5-dfb9f7ae5b05', '1ab9fd04-1781-4ae4-b08a-5a72d753ca31', updateTask)
            .then((res) => {
                setState(res.data.data.item)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

