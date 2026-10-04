"use server";

import { and, count, eq, gt } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { contactSchema, fieldErrors, type ActionState } from "@/lib/validation";

export async function submitContact(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    subject: formData.get("subject") ?? "",
    message: formData.get("message") ?? "",
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    // Silently "succeed" for bots that filled the honeypot.
    if (parsed.error.issues.some((issue) => issue.path[0] === "website")) {
      return { ok: true, message: "Thanks! Your message has been sent." };
    }
    return { ok: false, message: "Please fix the highlighted fields.", errors: fieldErrors(parsed.error) };
  }

  const { name, email, subject, message } = parsed.data;
  try {
    const db = getDb();
    const since = new Date(Date.now() - 15 * 60 * 1000);
    const [{ recent }] = await db
      .select({ recent: count() })
      .from(messages)
      .where(and(eq(messages.email, email.toLowerCase()), gt(messages.createdAt, since)));
    if (recent >= 3) {
      return { ok: false, message: "You've sent several messages recently. Please wait a little before trying again." };
    }

    await db.insert(messages).values({ name, email: email.toLowerCase(), subject, message });
  } catch (error) {
    console.error("Failed to save contact message", error);
    return { ok: false, message: "Something went wrong. Please try again or reach out directly." };
  }

  return { ok: true, message: "Thanks! Your message has been sent — I'll get back to you soon." };
}
