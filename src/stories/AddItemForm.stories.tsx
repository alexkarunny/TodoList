import React from 'react';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  argTypes: {
    onClick: {
      description: 'button clicked inside component' },
  }
} as Meta

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
  addItem: action('button clicked inside component')
}