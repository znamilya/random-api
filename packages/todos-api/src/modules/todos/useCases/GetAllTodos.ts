import { UseCase } from "../../shared/index.js";
import { TodosRepo } from "../entities/TodosRepo.js";

class GetAllTodosUseCase extends UseCase {
  private todosRepo: TodosRepo;

  constructor(todosRepo: TodosRepo) {
    super();
    this.todosRepo = todosRepo;
  }

  async execute() {
    const todos = await this.todosRepo.findAll();

    return todos;
  }
}

export { GetAllTodosUseCase };
