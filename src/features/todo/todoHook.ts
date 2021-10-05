import { useCallback } from "react";
import useSWR from "swr";
import { handleApiError } from "../api/error";
import { Todo } from "./todoServer";

const getUseTodoKey = (todoId: string) => `todo/getTodo/${todoId}`;

export const useTodo = (todoId: string) => {
  const getTodo = useCallback(async () => {
    const result = await fetch(`/api/todos/${todoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json() as unknown as Todo)
      .catch(handleApiError);

    if (result instanceof Error) {
      throw result;
    }

    return result;
  }, [todoId]);

  const { data, error } = useSWR(getUseTodoKey(todoId), getTodo);

  return {
    todo: data,
    error,
    loading: !error && !data,
  };
};
