import { Request, Response } from "express";
import { BaseController } from "../../../../shared/index.js";
import { CreateTodoUseCase } from "../../../useCases/CreateTodo.js";
import { TodoMapper } from "../../../mappers/Todo.js";

class PostTodo extends BaseController {
  constructor(private useCase: CreateTodoUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const todoDto = req.body;
    const todos = await this.useCase.execute(todoDto);

    if (todos.isLeft()) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }

    return res.json({ data: TodoMapper.entityToDTO(todos.value) });
  }
}

export { PostTodo };
