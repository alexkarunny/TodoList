import React from 'react';
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";

export default {
    title: 'TODOLIST/Task',
    component: Task
} as Meta

const Template: Story<TaskPropsType> = (args) => <Task {...args} />

const changeTaskStatusCallback = action('click task status')
const removeTaskCallback = action('click remove task')
const changeTaskTitleCallback = action('click task title')

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    removeTask: removeTaskCallback,
    changeTaskTitle: changeTaskTitleCallback,
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'JS', isDone: true},
    todoListID: 'todoListID',
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    task: {id: '2', title: 'CSS', isDone: false},
    todoListID: 'todoListID1',
    ...baseArgs
}