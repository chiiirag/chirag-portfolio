import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/auth/session";
import { getProfile } from "@/lib/data";
import { ProfileForm } from "./profile-form";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  await requireAdmin();
  const profile = await getProfile();

  return (
    <>
      <PageHeader title="Profile" description="Your personal details, hero copy and contact info." />
      <div className="space-y-6">
        <ProfileForm profile={profile} />
      </div>
    </>
  );
}
