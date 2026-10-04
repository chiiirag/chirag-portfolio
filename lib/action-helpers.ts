import "server-only";

export function formToObject(formData: FormData): Record<string, FormDataEntryValue> {
  const out: Record<string, FormDataEntryValue> = {};
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("$ACTION")) out[key] = value;
  }
  return out;
}

export function assertId(id: unknown): number {
  const n = Number(id);
  if (!Number.isSafeInteger(n) || n <= 0) throw new Error("Invalid id");
  return n;
}

/** Postgres unique_violation, unwrapping Drizzle's query error wrapper. */
export function isUniqueViolation(error: unknown): boolean {
  let current: unknown = error;
  for (let depth = 0; current && depth < 3; depth++) {
    if (typeof current === "object" && "code" in current && (current as { code?: string }).code === "23505") return true;
    current = (current as { cause?: unknown }).cause;
  }
  return false;
}

export const GENERIC_ERROR = "Something went wrong while saving. Please try again.";
