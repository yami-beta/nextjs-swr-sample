import { CheckIcon } from "@chakra-ui/icons";
import { Link, ListIcon, ListItem } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";
import { Todo } from "./todoServer";

export type TodoListItemProps = {
  todo: Todo;
};

export const TodoListItem: FC<TodoListItemProps> = ({ todo }) => {
  return (
    <ListItem>
      <Link as={NextLink} href={`/todos/${todo.id}`}>
        <a>
          {todo.done && <ListIcon as={CheckIcon} />}
          {todo.text}
        </a>
      </Link>
    </ListItem>
  );
};
