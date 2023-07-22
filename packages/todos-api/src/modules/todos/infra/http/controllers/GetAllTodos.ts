import { Request, Response } from "express";
import { BaseController, UseCase } from "../../../../../modules/shared/index.js";
import { TodoMapper } from "../../../mappers/Todo.js";

class GetAllTodos extends BaseController {
  private useCase: UseCase;

  constructor(useCase: UseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const todos = await this.useCase.execute();

    return res.json({ data: todos.value.map(TodoMapper.entityToDTO) });
  }
}

export { GetAllTodos };
