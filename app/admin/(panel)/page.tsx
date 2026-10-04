import { count, desc, eq } from "drizzle-orm";
import { ArrowRight, FolderKanban, Inbox, MessageSquareQuote, Sparkles } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { messages, projects, skills, testimonials } from "@/lib/db/schema";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  await requireAdmin();
  const db = getDb();

  const [[projectCount], [skillCount], [testimonialCount], [unreadCount], recent] = await Promise.all([
    db.select({ value: count() }).from(projects),
    db.select({ value: count() }).from(skills),
    db.select({ value: count() }).from(testimonials),
    db.select({ value: count() }).from(messages).where(eq(messages.read, false)),
    db.select().from(messages).orderBy(desc(messages.createdAt)).limit(5),
  ]);

  const cards = [
    { label: "Projects", value: projectCount.value, href: "/admin/projects", icon: FolderKanban },
    { label: "Skills", value: skillCount.value, href: "/admin/skills", icon: Sparkles },
    { label: "Testimonials", value: testimonialCount.value, href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "Unread messages", value: unreadCount.value, href: "/admin/messages", icon: Inbox },
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="Overview of your portfolio content." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, href, icon: Icon }) => (
          <Link key={label} href={href} className="card group p-5 transition hover:border-brand-200">
            <Icon className="size-5 text-brand-600" aria-hidden="true" />
            <p className="mt-3 text-3xl font-bold text-ink">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
          </Link>
        ))}
      </div>

      <section className="card mt-6 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-ink">Recent messages</h2>
          <Link href="/admin/messages" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No messages yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-slate-100">
            {recent.map((message) => (
              <li key={message.id} className="flex items-start justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">
                    {!message.read && <span className="mr-2 inline-block size-2 rounded-full bg-brand-600" aria-label="Unread" />}
                    {message.name} <span className="font-normal text-slate-500">· {message.email}</span>
                  </p>
                  <p className="truncate text-sm text-slate-500">{message.subject || message.message}</p>
                </div>
                <time className="shrink-0 text-xs text-slate-400" dateTime={message.createdAt.toISOString()}>
                  {formatDate(message.createdAt)}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
