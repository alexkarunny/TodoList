import React from 'react';
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]

} as Meta

const Template: Story = (args) => <AppWithRedux/>

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {
  addItem: action('button clicked inside component')
}