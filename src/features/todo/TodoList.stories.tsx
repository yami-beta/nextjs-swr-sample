import { Story, Meta } from "@storybook/react";
import { SWRConfig, Middleware, Fetcher } from "swr";
import { TodoList, TodoListProps } from "./TodoList";

export default {
  component: TodoList,
  title: `todo/${TodoList.name}`,
} as Meta;

const fetchMockMiddleware: Middleware = (useSWRNext) => {
  const mockFetcher: Fetcher<any> = () =>
    Array.from({ length: 10 }).map((_, i) => {
      return {
        id: `${i}`,
        text: `todo ${i}`,
        done: i % 2 === 0,
      };
    });

  return (key, _, config) => {
    const swr = useSWRNext(key, mockFetcher, config);
    return swr;
  };
};

const Template: Story<TodoListProps> = (args) => {
  return (
    <SWRConfig value={{ use: [fetchMockMiddleware] }}>
      <TodoList {...args} />
    </SWRConfig>
  );
};

export const Default = Template.bind({});

const errorMiddleware: Middleware = (useSWRNext) => {
  const mockFetcher: Fetcher<any> = () => {
    throw new Error();
  };

  return (key, _, config) => {
    const swr = useSWRNext(key, mockFetcher, config);
    return swr;
  };
};
export const Failed = () => {
  return (
    <SWRConfig value={{ use: [errorMiddleware] }}>
      <TodoList />
    </SWRConfig>
  );
};
