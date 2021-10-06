import { Alert, AlertIcon, List, Spinner } from "@chakra-ui/react";
import { FC } from "react";
import { TodoListItem } from "./TodoListItem";
import { useTodoList } from "./todoListHook";

export type TodoListProps = {};

export const TodoList: FC<TodoListProps> = () => {
  const { todoList, loading, error } = useTodoList();

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <Alert status="error">
        <AlertIcon boxSize="20px" />
        データの取得に失敗しました
        <br />
        {error.message}
      </Alert>
    );
  }
  return (
    <List>
      {todoList?.map((todo) => {
        return <TodoListItem key={todo.id} todo={todo} />;
      })}
    </List>
  );
};
