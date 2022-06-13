import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { cards } from "./cards";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send(cards.reduce((output, card) => `
    ${output}
    ${Object.keys(card).reduce((outputCard, key) => `
      ${outputCard}
      <strong>${key}: </strong>
      <span>${card[key]}</span>
      </br>
      `,
      ''
    )}
    `,
    ''
  ));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
