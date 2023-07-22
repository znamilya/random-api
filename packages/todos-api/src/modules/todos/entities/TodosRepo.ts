import { Either } from "@sweet-monads/either";
import { TodoEntity } from "./TodoEntity.js";

export type TodosRepo = {
  findAll: () => Promise<Either<Error, TodoEntity[]>>;
  findOne: (todoId: string) => Promise<Either<Error, TodoEntity>>;
  createOne: (todo: TodoEntity) => Promise<Either<Error, TodoEntity>>;
  deleteOne: (todoId: string) => Promise<Either<Error, boolean>>;
  updateOne: (todo: TodoEntity) => Promise<Either<Error, TodoEntity>>;
};
