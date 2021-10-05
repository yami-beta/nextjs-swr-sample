import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { FC } from "react";
import { useTodo } from "../../features/todo/todoHook";

type TodoPageProps = {};

const TodoPage: NextPage<TodoPageProps> = () => {
  const router = useRouter();

  if (typeof router.query.todoId !== "string") {
    return null;
  }

  return <Content todoId={router.query.todoId} />;
};

export default TodoPage;

const Content: FC<{ todoId: string }> = ({ todoId }) => {
  const { todo } = useTodo(todoId);

  return (
    <div>
      <pre>{JSON.stringify(todo, null, "  ")}</pre>
    </div>
  );
};
