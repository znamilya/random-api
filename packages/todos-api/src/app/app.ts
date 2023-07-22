import express from "express";
import { router } from "./router.js";

const app = express();
const PORT = process.env.PORT || 6001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
