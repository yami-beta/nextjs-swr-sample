export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

type TodoState = {
  ids: string[];
  entities: Record<string, Todo>;
};

const todoState: TodoState = {
  ids: [],
  entities: {},
};

export const getTodos = () => {
  return todoState.ids
    .map((id) => todoState.entities[id])
    .filter((todo): todo is Todo => !!todo);
};

export const createTodo = (todo: Pick<Todo, "text">) => {
  const id = `${todoState.ids.length}`;

  todoState.ids = [...todoState.ids, id];

  todoState.entities = {
    ...todoState.entities,
    [id]: {
      ...todo,
      id,
      done: false,
    },
  };
};

export const editTodo = (todo: Todo) => {
  todoState.entities = {
    ...todoState.entities,
    [todo.id]: todo,
  };
};

export const deleteTodo = (todoId: string) => {
  todoState.ids = todoState.ids.filter((id) => id !== todoId);

  todoState.entities = Object.fromEntries(
    Object.entries(todoState.entities).filter(([id]) => id !== todoId)
  );
};
