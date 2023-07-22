import { left, right } from "@sweet-monads/either";
import { UseCase } from "../../shared/index.js";
import { TodosRepo } from "../entities/TodosRepo.js";

class CompleteTodoUseCase extends UseCase {
  private todosRepo: TodosRepo;

  constructor(todosRepo: TodosRepo) {
    super();
    this.todosRepo = todosRepo;
  }

  async execute(todoId: string) {
    const todoOrError = await this.todosRepo.findOne(todoId);

    if (todoOrError.isLeft()) {
      return left(new Error(`Todo ${todoId} not found`));
    }

    const todo = todoOrError.value;

    todo.complete();

    await this.todosRepo.updateOne(todo);

    return right(todo);
  }
}

export { CompleteTodoUseCase };
