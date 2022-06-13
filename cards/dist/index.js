"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cards_1 = require("./cards");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send(cards_1.cards.reduce((output, card) => `
    ${output}
    ${Object.keys(card).reduce((outputCard, key) => `
      ${outputCard}
      <strong>${key}: </strong>
      <span>${card[key]}</span>
      </br>
      `, '')}
    `, ''));
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
