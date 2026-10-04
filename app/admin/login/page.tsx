import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  const { next } = await searchParams;
  const nextPath = typeof next === "string" ? next : "/admin";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="card w-full max-w-sm p-8">
        <h1 className="text-2xl font-bold text-ink">Admin sign in</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your portfolio content.</p>
        <LoginForm next={nextPath} />
      </div>
    </main>
  );
}
