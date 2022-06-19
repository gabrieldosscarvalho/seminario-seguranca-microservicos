import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { cards } from "./cards";
import { decrypt, encrypt } from "./crypt";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get("/", (req: Request, res: Response) => {
  return res.json(Object.fromEntries(cards));
});

app.get("/account/:accountId", (req: Request, res: Response) => {
  const card = cards.get(req.params?.accountId ?? "");

  res.status(card ? 200 : 404).json(card);
});

app.get("/secrets/", async (req: Request, res: Response) => {
  return res.send(encrypt(JSON.stringify(Object.fromEntries(cards))));
});

app.get("/secrets/:accountId", async (req: Request, res: Response) => {
  const card = cards.get(req.params?.accountId ?? "");

  return res.status(card ? 200 : 404).send(encrypt(JSON.stringify(card)));
});

app.post("/secrets/decrypt", async (req: Request, res: Response) => {
  return res.send(decrypt(req.body));
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: Card-service is running at https://localhost:${port}`
  );
});
