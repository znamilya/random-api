import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { left, right } from "@sweet-monads/either";
import { TodoEntity } from "../../entities/TodoEntity.js";
import { TodosRepo } from "../../entities/TodosRepo.js";
import { TodoMapper } from "../../mappers/Todo.js";

type Todo = {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
};

type Schema = {
  todos: Todo[];
};

class LowDBTodosRepo implements TodosRepo {
  private db: Low<Schema>;

  constructor() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const file = join(__dirname, "db.json");
    const adapter = new JSONFile<Schema>(file);

    this.db = new Low(adapter, { todos: [] });
    this.db.read();
  }

  async findAll() {
    const todos = this.db.data.todos;

    console.log(todos);

    return right(todos.map(TodoMapper.persistanceToEntity));
  }

  async findOne(todoId: string) {
    const todo = this.db.data.todos.find((todo) => todo.id === todoId);

    if (!todo) {
      return left(new Error());
    }

    return right(TodoMapper.persistanceToEntity(todo));
  }

  async createOne(todo: TodoEntity) {
    const todoToCreate = TodoMapper.entityToPersistance(todo);

    this.db.data.todos.push(todoToCreate);
    this.db.write();

    return right(todo);
  }

  async deleteOne(todoId: string) {
    const todoIndex = this.db.data.todos.findIndex((todo) => todo.id === todoId);

    if (todoIndex === -1) {
      return right(true);
    }

    this.db.data.todos.splice(todoIndex, 1);
    this.db.write();

    return right(true);
  }

  async updateOne(todo: TodoEntity) {
    const todoIndex = this.db.data.todos.findIndex((t) => t.id === todo.id);

    this.db.data.todos[todoIndex] = TodoMapper.entityToPersistance(todo);
    this.db.write();

    return right(TodoMapper.persistanceToEntity(this.db.data.todos[todoIndex]));
  }
}

export { LowDBTodosRepo };
