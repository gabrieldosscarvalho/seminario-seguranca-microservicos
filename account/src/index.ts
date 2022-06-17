import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { accounts } from "./accounts";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.status(accounts.length ? 200 : 404).json(accounts);
});

app.get("/:accountId", (req: Request, res: Response) => {
  const account = accounts.find((acc) => acc.id === req.params?.accountId);

  res.status(account ? 200 : 404).json(account);
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: Account-service is running at https://localhost:${port}`
  );
});
