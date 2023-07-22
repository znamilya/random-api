import { left, right } from "@sweet-monads/either";
import { UseCase } from "../../shared/index.js";
import { TodosRepo } from "../entities/TodosRepo.js";

class GetTodoByIdUseCase extends UseCase {
  private todosRepo: TodosRepo;

  constructor(todosRepo: TodosRepo) {
    super();
    this.todosRepo = todosRepo;
  }

  async execute(todoId: string) {
    const todo = await this.todosRepo.findOne(todoId);

    if (todo.isLeft()) {
      return left(new Error(`Todo ${todoId} not found`));
    }

    return right(todo.value);
  }
}

export { GetTodoByIdUseCase };
