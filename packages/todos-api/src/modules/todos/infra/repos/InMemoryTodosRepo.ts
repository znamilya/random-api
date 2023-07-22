import { left, right } from "@sweet-monads/either";
import { TodosRepo } from "../../entities/TodosRepo.js";
import { TodoEntity } from "../../entities/TodoEntity.js";
import { TodoMapper } from "../../mappers/Todo.js";

type DbTodo = {
  id: string;
  user_id: string;
  title: string;
  completed: boolean;
};

class InMemoryTodosRepo implements TodosRepo {
  private todos: DbTodo[];

  constructor() {
    this.todos = [
      {
        id: "123",
        user_id: "243253",
        title: "Todo 1",
        completed: false,
      },
    ];
  }

  async findAll() {
    return right(this.todos.map(TodoMapper.persistanceToEntity));
  }

  async findOne(todoId: string) {
    const todo = this.todos.find((todo) => todo.id === todoId);

    if (!todo) {
      return left(new Error());
    }

    return right(TodoMapper.persistanceToEntity(todo));
  }

  async createOne(todo: TodoEntity) {
    this.todos.push(TodoMapper.entityToPersistance(todo));

    return right(todo);
  }

  async deleteOne(todoId: string) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);

    return right(true);
  }

  async updateOne(todo: TodoEntity) {
    const todoIndex = this.todos.findIndex((t) => t.id === todo.id);

    this.todos[todoIndex] = TodoMapper.entityToPersistance(todo);

    return right(TodoMapper.persistanceToEntity(this.todos[todoIndex]));
  }
}

export { InMemoryTodosRepo };
