import {
  completeTodoUseCase,
  createTodoUseCase,
  deleteTodoByIdUseCase,
  getAllTodosUseCase,
  getTodoByIdUseCase,
} from "../../../useCases/index.js";
import { CompleteTodoById } from "./CompleteTodoById.js";
import { DeleteTodoById } from "./DeleteTodoById.js";
import { GetAllTodos } from "./GetAllTodos.js";
import { GetTodoById } from "./GetTodoById.js";
import { PostTodo } from "./PostTodo.js";

export const getAllTodos = new GetAllTodos(getAllTodosUseCase);
export const getTodoById = new GetTodoById(getTodoByIdUseCase);
export const deleteTodoById = new DeleteTodoById(deleteTodoByIdUseCase);
export const completeTodoById = new CompleteTodoById(completeTodoUseCase);
export const postTodo = new PostTodo(createTodoUseCase);
