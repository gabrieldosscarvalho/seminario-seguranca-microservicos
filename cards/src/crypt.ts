import crypto, { constants } from "crypto";
import { readFileSync } from "fs";

const key = {
  public: crypto.createPublicKey(readFileSync("./public-key.pem", "utf8")),
  private: crypto.createPrivateKey(readFileSync("./private-key.pem", "utf8")),
};

export const encrypt = (data: string): string => {
  const firstCipherText = crypto.privateEncrypt(
    { key: key.private },
    Buffer.from(data)
  );
  const cipherText = crypto.privateEncrypt(
    { key: key.private, padding: constants.RSA_NO_PADDING },
    firstCipherText
  );

  return cipherText.toString("base64");
};

export const decrypt = (encryptData: string): unknown => {
  const firstDecryptData = crypto.publicDecrypt(
    { key: key.public, padding: constants.RSA_NO_PADDING },
    Buffer.from(encryptData, "base64")
  );
  const decryptData = crypto.publicDecrypt(
    { key: key.public },
    firstDecryptData
  );

  return decryptData.toString();
};
