import { NextApiRequest, NextApiResponse } from "next";
import {
  deleteTodo,
  editTodo,
  getTodo,
} from "../../../features/todo/todoServer";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { todoId } = req.query;
  if (typeof todoId !== "string") {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  switch (req.method) {
    case "GET": {
      const todo = getTodo(todoId);
      if (!todo) {
        res.status(404).json({ message: "Not Found" });
        return;
      }

      res.status(200).json(todo);
      break;
    }
    case "PUT": {
      editTodo({
        ...req.body,
        id: todoId,
      });

      res.status(204).send(undefined);
      break;
    }
    case "DELETE": {
      deleteTodo(todoId);
      res.status(204).send(undefined);
      break;
    }
    default: {
      res.status(404).json({ message: "Not Found" });
      break;
    }
  }
};

export default handler;
