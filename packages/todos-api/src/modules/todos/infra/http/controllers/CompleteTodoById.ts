import { Request, Response } from "express";
import { BaseController, UseCase } from "../../../../shared/index.js";

class CompleteTodoById extends BaseController {
  private useCase: UseCase;

  constructor(useCase: UseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const todoId = req.params.todoId;
    const todo = await this.useCase.execute(todoId);

    if (todo.isLeft()) {
      switch (todo.value.constructor) {
        case Error:
          return res.status(404).json({
            message: todo.value.message,
          });
        default:
          return res.status(500).json({
            message: "Something went wrong",
          });
      }
    }

    return res.status(204).send();
  }
}

export { CompleteTodoById };
