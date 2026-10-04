import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { getProfile } from "@/lib/data";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const profile = await getProfile();
  // Evaluated when the page is (re)generated; ISR keeps it current.
  const year = new Date().getFullYear();

  return (
    <>
      <Navbar name={profile.name} title={profile.title} />
      <main className="flex-1">{children}</main>
      <Footer profile={profile} year={year} />
    </>
  );
}
