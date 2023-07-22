import { left, right } from "@sweet-monads/either";
import { UseCase } from "../../shared/index.js";
import { TodosRepo } from "../entities/TodosRepo.js";

class DeleteTodoByIdUseCase extends UseCase {
  private todosRepo: TodosRepo;

  constructor(todosRepo: TodosRepo) {
    super();
    this.todosRepo = todosRepo;
  }

  async execute(todoId: string) {
    const result = await this.todosRepo.deleteOne(todoId);

    if (result.isLeft()) {
      return left(new Error(`Todo ${todoId} couldn't be deleted`));
    }

    return right(result.value);
  }
}

export { DeleteTodoByIdUseCase };
