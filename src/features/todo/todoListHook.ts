import useSWR from "swr";
import { handleApiError } from "../api/error";
import { Todo } from "./todoServer";

const todoListKey = "todo/getTodoList";

export const useTodoList = () => {
  const { data, error } = useSWR(todoListKey, getTodoList);

  return {
    todoList: data,
    loading: !error && !data,
    error,
  };
};

const getTodoList = async () => {
  const result = await fetch("/api/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json() as unknown as Todo[])
    .catch(handleApiError);

  if (result instanceof Error) {
    throw result;
  }

  return result;
};
