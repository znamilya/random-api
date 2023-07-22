import express, { Request, Response } from "express";
import {
  completeTodoById,
  deleteTodoById,
  getAllTodos,
  getTodoById,
  postTodo,
} from "./controllers/index.js";
import { auth } from "./middlewares/auth.js";

const todosRouter = express.Router();

// todosRouter.get("/", [auth], (req: Request, res: Response) => getAllTodos.execute(req, res));
todosRouter.get("/", (req: Request, res: Response) => getAllTodos.execute(req, res));
todosRouter.post("/", [auth], (req: Request, res: Response) => postTodo.execute(req, res));
todosRouter.get("/:todoId", [auth], (req: Request, res: Response) => getTodoById.execute(req, res));
todosRouter.delete("/:todoId", [auth], (req: Request, res: Response) =>
  deleteTodoById.execute(req, res),
);
todosRouter.put("/:todoId/complete", [auth], (req: Request, res: Response) =>
  completeTodoById.execute(req, res),
);

export { todosRouter };
