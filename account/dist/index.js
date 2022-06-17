"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const accounts_1 = require("./accounts");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.status(accounts_1.accounts.length ? 200 : 404).json(accounts_1.accounts);
});
app.get("/:accountId", (req, res) => {
    const account = accounts_1.accounts.find((acc) => { var _a; return acc.id === ((_a = req.params) === null || _a === void 0 ? void 0 : _a.accountId); });
    res.status(account ? 200 : 404).json(account);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Account-service is running at https://localhost:${port}`);
});
