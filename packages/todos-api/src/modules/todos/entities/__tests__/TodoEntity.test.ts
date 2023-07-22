describe("", () => {
  const todo = TodoEntity.create({
    userId: "123",
    title: "Todo 1",
    completed: false,
  });

  todo.complete();

  expect(todo.completed).toBe(true);
});
