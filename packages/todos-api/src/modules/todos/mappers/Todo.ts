import { TodoEntity } from "../entities/TodoEntity.js";
import { ITodoDto } from "../dtos/ITodoDto.js";

class TodoMapper {
  static persistanceToEntity(todo: any): TodoEntity {
    return TodoEntity.create(
      {
        userId: todo.user_id,
        title: todo.title,
        completed: todo.completed,
      },
      todo.id,
    );
  }

  static entityToDTO(todo: TodoEntity): ITodoDto {
    return {
      id: todo.id,
      userId: todo.userId,
      title: todo.title,
      completed: todo.completed,
    };
  }

  static entityToPersistance(todo: TodoEntity): any {
    return {
      id: todo.id,
      user_id: todo.userId,
      title: todo.title,
      completed: todo.completed,
    };
  }
}

export { TodoMapper };
