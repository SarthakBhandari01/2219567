import { customAlphabet } from "nanoid";

const alphabet =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const nanoid = customAlphabet(alphabet, 6);

function generateCode() {
  return nanoid();
}

export default generateCode;
