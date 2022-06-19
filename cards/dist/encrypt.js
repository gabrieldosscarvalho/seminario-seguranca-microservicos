"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = require("fs");
const key = {
    public: crypto_1.default.createPublicKey((0, fs_1.readFileSync)("./public-key.pem", "utf8")),
    private: crypto_1.default.createPrivateKey((0, fs_1.readFileSync)("./private-key.pem", "utf8")),
};
const encrypt = (data) => {
    const cipherText = crypto_1.default.publicEncrypt(key.public, Buffer.from(data));
    return cipherText.toString("base64");
};
exports.encrypt = encrypt;
const decrypt = (encryptData) => {
    const cipherText = crypto_1.default.privateDecrypt(key.private, Buffer.from(encryptData));
    return cipherText.toString();
};
exports.decrypt = decrypt;
