import { NextApiRequest, NextApiResponse } from "next";
import { ApiErrorResponse } from "../../features/api/error";
import { createTodo, getTodos, Todo } from "../../features/todo/todoServer";

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<Todo[] | undefined | ApiErrorResponse>
) => {
  switch (req.method) {
    case "GET": {
      res.status(200).json(getTodos());
      break;
    }
    case "POST": {
      createTodo(req.body);
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
