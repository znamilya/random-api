import express from "express";

import { todosRouter } from "../modules/todos/index.js";

const router = express.Router();

router.use("/todos", todosRouter);

export { router };
