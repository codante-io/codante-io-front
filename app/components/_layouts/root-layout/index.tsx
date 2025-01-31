import Footer from "~/components/_layouts/footer";
import Navbar from "~/components/_layouts/navbar";
import type { User } from "~/lib/models/user.server";

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
      <div id="alert-banner-upper"></div>
      <Navbar user={user} hideLinks={hideNavbarLinks} />
      <div id="alert-banner-lower"></div>
      <main className="lg:py-10 py-6 min-h-[calc(100vh-170px)] mx-auto">
        {children}
      </main>
      <Footer />
    </>
  );
}
