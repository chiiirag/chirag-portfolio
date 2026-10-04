// Decorative phone mockups shown in the hero when no hero image is uploaded.
import type { ReactNode } from "react";

function Phone({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`absolute aspect-[9/19] w-[46%] max-w-52 rounded-[2.2rem] border-[6px] border-slate-900 bg-slate-900 shadow-2xl ${className ?? ""}`}
    >
      <div className="absolute top-2 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-slate-900" />
      <div className="h-full w-full overflow-hidden rounded-[1.7rem] bg-white">{children}</div>
    </div>
  );
}

export function PhoneMockups() {
  return (
    <div className="relative mx-auto aspect-[1/1.05] w-full max-w-md" aria-hidden="true">
      <div className="absolute inset-x-6 top-10 bottom-6 rounded-[45%] bg-gradient-to-br from-brand-200 via-brand-400 to-brand-600 opacity-60 blur-2xl" />

      <Phone className="top-[2%] left-[4%] -rotate-6">
        <div className="relative h-3/5 bg-[linear-gradient(135deg,#e8eef9_25%,#f4f7fc_25%,#f4f7fc_50%,#e8eef9_50%,#e8eef9_75%,#f4f7fc_75%)] bg-[length:28px_28px]">
          <svg viewBox="0 0 100 120" className="absolute inset-0 h-full w-full">
            <path d="M15 100 C 30 70, 20 50, 45 45 S 80 30, 82 12" fill="none" stroke="#3a66ff" strokeWidth="3" strokeLinecap="round" />
            <circle cx="15" cy="100" r="4" fill="#1f4ff5" />
            <circle cx="82" cy="12" r="4" fill="#1f4ff5" />
          </svg>
        </div>
        <div className="space-y-2 p-3">
          <p className="text-[11px] font-bold text-ink">Your ride is on the way</p>
          <p className="text-[9px] text-slate-500">2 min away</p>
          <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2">
            <div className="size-6 rounded-full bg-gradient-to-br from-amber-300 to-orange-500" />
            <div className="flex-1">
              <div className="h-1.5 w-14 rounded bg-slate-300" />
              <div className="mt-1 h-1.5 w-10 rounded bg-slate-200" />
            </div>
            <span className="text-[9px] font-bold text-ink">$12.00</span>
          </div>
        </div>
      </Phone>

      <Phone className="right-[4%] bottom-[2%] rotate-3">
        <div className="bg-gradient-to-b from-brand-600 to-brand-500 p-3 pt-7 text-white">
          <p className="text-[9px] opacity-80">Good Morning</p>
          <p className="text-[12px] font-bold">Let&apos;s Stay Active</p>
          <div className="mt-3 rounded-xl bg-gradient-to-r from-orange-300 to-amber-200 p-2 text-ink">
            <p className="text-[9px] font-bold">7 Days Streak</p>
            <p className="text-[8px]">Full Body Training</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 p-3">
          {["bg-brand-100", "bg-violet-100", "bg-amber-100", "bg-brand-500", "bg-violet-500", "bg-pink-400"].map((c) => (
            <div key={c} className={`aspect-square rounded-full ${c}`} />
          ))}
        </div>
      </Phone>
    </div>
  );
}
