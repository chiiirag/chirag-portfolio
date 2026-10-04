#!/usr/bin/env node
// Generates an ADMIN_PASSWORD_HASH value for .env.local / Vercel.
// Usage: npm run hash-password            (prompts for the password)
//        npm run hash-password -- "secret" (non-interactive)
import { randomBytes, scrypt } from "node:crypto";
import { createInterface } from "node:readline/promises";

const KEY_LENGTH = 64;
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1 };

async function readPassword() {
  if (process.argv[2]) return process.argv[2];
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question("Admin password: ");
  rl.close();
  return answer;
}

const password = (await readPassword()).trim();
if (password.length < 10) {
  console.error("Password must be at least 10 characters.");
  process.exit(1);
}

const salt = randomBytes(16);
const key = await new Promise((resolve, reject) =>
  scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS, (err, derived) => (err ? reject(err) : resolve(derived))),
);

console.log(`\nADMIN_PASSWORD_HASH=scrypt:${salt.toString("hex")}:${key.toString("hex")}\n`);
