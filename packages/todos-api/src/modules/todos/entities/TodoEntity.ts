import { Entity } from "../../shared/index.js";

export type TodoProps = {
  userId: string;
  title: string;
  completed: boolean;
};

class TodoEntity extends Entity<TodoProps> {
  static create(props: TodoProps, id?: string) {
    return new TodoEntity(props, id);
  }

  get userId() {
    return this.props.userId;
  }

  get title() {
    return this.props.title;
  }

  get completed() {
    return this.props.completed;
  }

  complete(): void {
    this.props.completed = true;
  }
}

export { TodoEntity };
