import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { getProfile, getStats } from "@/lib/data";
import { ProfileForm } from "./profile-form";
import { StatsManager } from "./stats-manager";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  await requireAdmin();
  const [profile, stats] = await Promise.all([getProfile(), getStats()]);

  return (
    <>
      <PageHeader title="Profile & Stats" description="Your personal details, hero copy, contact info and headline numbers." />
      <div className="space-y-6">
        <StatsManager stats={stats.map(({ id, value, label, sortOrder }) => ({ id, value, label, sortOrder }))} />
        <ProfileForm profile={profile} uploadsEnabled={Boolean(process.env.BLOB_READ_WRITE_TOKEN)} />
      </div>
    </>
  );
}
