import { desc } from "drizzle-orm";
import { Mail } from "lucide-react";
import type { Metadata } from "next";
import { deleteMessage } from "@/app/actions/admin/messages";
import { DeleteButton } from "@/components/admin/delete-button";
import { EmptyState, PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { cn, formatDate } from "@/lib/utils";
import { ReadToggle } from "./read-toggle";

export const metadata: Metadata = { title: "Messages" };

export default async function MessagesPage() {
  await requireAdmin();
  const rows = await getDb().select().from(messages).orderBy(desc(messages.createdAt)).limit(200);

  return (
    <>
      <PageHeader title="Messages" description="Submissions from the contact form (latest 200)." />
      {rows.length === 0 ? (
        <EmptyState>No messages yet.</EmptyState>
      ) : (
        <ul className="space-y-3">
          {rows.map((message) => (
            <li key={message.id} className={cn("card p-5", !message.read && "border-brand-200 ring-1 ring-brand-100")}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-ink">
                    {!message.read && <span className="mr-2 inline-block size-2 rounded-full bg-brand-600" aria-label="Unread" />}
                    {message.name}
                  </p>
                  <a href={`mailto:${message.email}`} className="text-sm text-brand-600 hover:underline">
                    {message.email}
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <time className="mr-2 text-xs text-slate-400" dateTime={message.createdAt.toISOString()}>
                    {formatDate(message.createdAt)}
                  </time>
                  <a
                    href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject || "Your message"}`)}`}
                    className="btn-ghost px-2.5"
                    aria-label={`Reply to ${message.name}`}
                  >
                    <Mail className="size-4" />
                  </a>
                  <ReadToggle id={message.id} read={message.read} />
                  <DeleteButton action={deleteMessage.bind(null, message.id)} confirmText="Delete this message?" />
                </div>
              </div>
              {message.subject && <p className="mt-3 text-sm font-semibold text-ink">{message.subject}</p>}
              <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-slate-600">{message.message}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
