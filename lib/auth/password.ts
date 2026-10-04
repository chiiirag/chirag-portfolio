import "server-only";
import { scrypt, timingSafeEqual, type BinaryLike } from "node:crypto";

// Must match scripts/hash-password.mjs
const KEY_LENGTH = 64;
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1 };

function deriveKey(password: BinaryLike, salt: BinaryLike): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS, (err, key) => (err ? reject(err) : resolve(key)));
  });
}

/** Verifies a password against a hash in the format `scrypt:<saltHex>:<hashHex>`. */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algorithm, saltHex, hashHex] = stored.split(":");
  if (algorithm !== "scrypt" || !saltHex || !hashHex) return false;

  const expected = Buffer.from(hashHex, "hex");
  if (expected.length !== KEY_LENGTH) return false;

  const actual = await deriveKey(password, Buffer.from(saltHex, "hex"));
  return timingSafeEqual(actual, expected);
}
