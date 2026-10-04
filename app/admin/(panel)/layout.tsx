import { count, eq } from "drizzle-orm";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { messages } from "@/lib/db/schema";

export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  const session = await requireAdmin();
  const [{ unread }] = await getDb().select({ unread: count() }).from(messages).where(eq(messages.read, false));

  return (
    <AdminShell email={session.sub} unread={unread}>
      {children}
    </AdminShell>
  );
}
