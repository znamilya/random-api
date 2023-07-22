import { LowDBTodosRepo } from "../infra/repos/index.js";
import { CompleteTodoUseCase } from "./CompleteTodo.js";
import { CreateTodoUseCase } from "./CreateTodo.js";
import { DeleteTodoByIdUseCase } from "./DeleteTodoById.js";
import { GetAllTodosUseCase } from "./GetAllTodos.js";
import { GetTodoByIdUseCase } from "./GetTodoById.js";

const lowDBTodosRepo = new LowDBTodosRepo();

export const getAllTodosUseCase = new GetAllTodosUseCase(lowDBTodosRepo);
export const getTodoByIdUseCase = new GetTodoByIdUseCase(lowDBTodosRepo);
export const deleteTodoByIdUseCase = new DeleteTodoByIdUseCase(lowDBTodosRepo);
export const completeTodoUseCase = new CompleteTodoUseCase(lowDBTodosRepo);
export const createTodoUseCase = new CreateTodoUseCase(lowDBTodosRepo);
