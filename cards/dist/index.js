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
    return res.json(Object.fromEntries(cards_1.cards));
});
app.get("/:accountId", (req, res) => {
    var _a, _b;
    const card = cards_1.cards.get((_b = (_a = req.params) === null || _a === void 0 ? void 0 : _a.accountId) !== null && _b !== void 0 ? _b : "");
    res.status(card ? 200 : 404).json(card);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Card-service is running at https://localhost:${port}`);
});
