"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importStar(require("crypto"));
const fs_1 = require("fs");
const key = {
    public: crypto_1.default.createPublicKey((0, fs_1.readFileSync)("./public-key.pem", "utf8")),
    private: crypto_1.default.createPrivateKey((0, fs_1.readFileSync)("./private-key.pem", "utf8")),
};
const encrypt = (data) => {
    const firstCipherText = crypto_1.default.privateEncrypt({ key: key.private }, Buffer.from(data));
    const cipherText = crypto_1.default.privateEncrypt({ key: key.private, padding: crypto_1.constants.RSA_NO_PADDING }, firstCipherText);
    return cipherText.toString("base64");
};
exports.encrypt = encrypt;
const decrypt = (encryptData) => {
    const firstDecryptData = crypto_1.default.publicDecrypt({ key: key.public, padding: crypto_1.constants.RSA_NO_PADDING }, Buffer.from(encryptData, "base64"));
    const decryptData = crypto_1.default.publicDecrypt({ key: key.public }, firstDecryptData);
    return decryptData.toString();
};
exports.decrypt = decrypt;
