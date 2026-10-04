"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar({ name, title }: { name: string; title: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-lg">
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Link href="/" className="leading-tight" onClick={close}>
          <span className="block text-base font-bold text-ink">{name}</span>
          <span className="block text-xs text-slate-500">{title}</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-brand-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/#contact" className="btn-primary hidden md:inline-flex">
          Let&apos;s Work Together <ArrowRight className="size-4" aria-hidden="true" />
        </Link>

        <button
          type="button"
          className="btn-ghost -mr-2 px-2.5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white md:hidden">
          <ul className="container-page flex flex-col py-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="block rounded-lg px-2 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/#contact" onClick={close} className="btn-primary w-full">
                Let&apos;s Work Together <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
