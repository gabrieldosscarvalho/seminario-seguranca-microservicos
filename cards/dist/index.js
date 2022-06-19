"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cards_1 = require("./cards");
const crypt_1 = require("./crypt");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.text());
app.get("/", (req, res) => {
    return res.json(Object.fromEntries(cards_1.cards));
});
app.get("/account/:accountId", (req, res) => {
    var _a, _b;
    const card = cards_1.cards.get((_b = (_a = req.params) === null || _a === void 0 ? void 0 : _a.accountId) !== null && _b !== void 0 ? _b : "");
    res.status(card ? 200 : 404).json(card);
});
app.get("/secrets/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send((0, crypt_1.encrypt)(JSON.stringify(Object.fromEntries(cards_1.cards))));
}));
app.get("/secrets/:accountId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const card = cards_1.cards.get((_b = (_a = req.params) === null || _a === void 0 ? void 0 : _a.accountId) !== null && _b !== void 0 ? _b : "");
    return res.status(card ? 200 : 404).send((0, crypt_1.encrypt)(JSON.stringify(card)));
}));
app.post("/secrets/decrypt", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send((0, crypt_1.decrypt)(req.body));
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Card-service is running at https://localhost:${port}`);
});
