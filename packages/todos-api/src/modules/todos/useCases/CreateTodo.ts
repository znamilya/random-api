import { Either, left, right } from "@sweet-monads/either";
import { UseCase } from "../../shared/index.js";
import { TodosRepo } from "../entities/TodosRepo.js";
import { ICreateTodoDto } from "../dtos/ICreateTodo.js";
import { TodoEntity } from "../entities/TodoEntity.js";

class CreateTodoUseCase extends UseCase {
  private todosRepo: TodosRepo;

  constructor(todosRepo: TodosRepo) {
    super();
    this.todosRepo = todosRepo;
  }

  async execute(todoDto: ICreateTodoDto): Promise<Either<Error, TodoEntity>> {
    if (!todoDto.title) {
      return left(new Error("Todo must have a title"));
    }

    if (todoDto.title.length < 3) {
      return left(new Error("Todo title must have at least 3 characters"));
    }

    if (todoDto.title.length > 30) {
      return left(new Error("Todo title must have at most 30 characters"));
    }

    if (!todoDto.userId) {
      return left(new Error("Todo must have a user id"));
    }

    const todo = TodoEntity.create(todoDto);

    const newTodoOrError = await this.todosRepo.createOne(todo);

    if (newTodoOrError.isLeft()) {
      return left(new Error("Todo couldn't be created"));
    }

    return right(newTodoOrError.value);
  }
}

export { CreateTodoUseCase };
