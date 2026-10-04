"use server";

import { timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";
import { fieldErrors, loginSchema, type ActionState } from "@/lib/validation";

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function safeRedirectTarget(value: FormDataEntryValue | null): string {
  const target = typeof value === "string" ? value : "";
  return target.startsWith("/admin") && !target.startsWith("//") ? target : "/admin";
}

export async function login(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email") ?? "",
    password: formData.get("password") ?? "",
  });
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (!adminEmail || !passwordHash || !process.env.SESSION_SECRET) {
    console.error("Admin login is not configured: set ADMIN_EMAIL, ADMIN_PASSWORD_HASH and SESSION_SECRET.");
    return { ok: false, message: "Admin login is not configured on the server." };
  }

  if (!/^scrypt:[0-9a-f]{32}:[0-9a-f]{128}$/.test(passwordHash)) {
    console.error(
      "ADMIN_PASSWORD_HASH is not a valid hash. Run `npm run hash-password` and paste its output (it starts with `scrypt:`), not the plain password.",
    );
  }

  // Always run the (slow) hash check so response time doesn't reveal whether the email matched.
  const passwordOk = await verifyPassword(parsed.data.password, passwordHash);
  const emailOk = safeEqual(parsed.data.email, adminEmail);

  if (!passwordOk || !emailOk) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { ok: false, message: "Invalid email or password." };
  }

  await createSession(adminEmail);
  redirect(safeRedirectTarget(formData.get("next")));
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
