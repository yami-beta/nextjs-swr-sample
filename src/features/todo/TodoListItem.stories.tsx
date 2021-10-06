import { List } from "@chakra-ui/react";
import { Story, Meta } from "@storybook/react";
import { TodoListItem, TodoListItemProps } from "./TodoListItem";

export default {
  component: TodoListItem,
  title: `todo/${TodoListItem.name}`,
} as Meta;

const Template: Story<TodoListItemProps> = (args) => {
  return (
    <List>
      <TodoListItem {...args} />
    </List>
  );
};

export const Default = Template.bind({});
Default.args = {
  todo: {
    id: "todo1",
    text: "todo 1",
    done: false,
  },
};
