import { NextPage } from "next";
import Link from "next/link";
import { useTodoList } from "../features/todo/todoListHook";

type IndexPageProps = {};

const IndexPage: NextPage<IndexPageProps> = () => {
  const { todoList } = useTodoList();

  return (
    <div>
      <h1>Index</h1>
      {todoList && (
        <ul>
          {todoList.map((todo) => {
            return (
              <li key={todo.id}>
                <Link href={`/todos/${todo.id}`}>
                  <a>{todo.text}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default IndexPage;
