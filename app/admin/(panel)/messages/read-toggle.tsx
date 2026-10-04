"use client";

import { LoaderCircle, MailCheck, MailOpen } from "lucide-react";
import { useTransition } from "react";
import { setMessageRead } from "@/app/actions/admin/messages";

export function ReadToggle({ id, read }: { id: number; read: boolean }) {
  const [pending, startTransition] = useTransition();
  const label = read ? "Mark as unread" : "Mark as read";

  return (
    <button
      type="button"
      className="btn-ghost px-2.5"
      disabled={pending}
      aria-label={label}
      title={label}
      onClick={() => startTransition(() => setMessageRead(id, !read))}
    >
      {pending ? <LoaderCircle className="size-4 animate-spin" /> : read ? <MailOpen className="size-4" /> : <MailCheck className="size-4" />}
    </button>
  );
}
