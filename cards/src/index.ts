import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { cards } from "./cards";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  return res.json(Object.fromEntries(cards));
});

app.get("/:accountId", (req: Request, res: Response) => {
  const card = cards.get(req.params?.accountId ?? "");

  res.status(card ? 200 : 404).json(card);
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: Card-service is running at https://localhost:${port}`
  );
});
