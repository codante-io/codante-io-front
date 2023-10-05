import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import type { User } from "~/models/user.server";

type AppLayoutProps = {
  children: React.ReactNode;
  user: User | null;
  hideNavbarLinks?: boolean;
};

export default function AppLayout({
  user,
  children,
  hideNavbarLinks,
}: AppLayoutProps) {
  return (
    <>
      <Navbar user={user} hideLinks={hideNavbarLinks} />
      <main className="lg:py-10 py-6 min-h-[calc(100vh-170px)] mx-auto">
        {children}
      </main>
      <Footer />
    </>
  );
}
