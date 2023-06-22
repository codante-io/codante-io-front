import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import type { User } from "~/models/user.server";

type AppLayoutProps = {
  children: React.ReactNode;
  user: User | null;
};

export default function AppLayout({ user, children }: AppLayoutProps) {
  return (
    <>
      <Navbar user={user} />
      <main className="lg:py-10 py-6 min-h-[calc(100vh-170px)] mx-auto">
        {children}
      </main>
      <Footer />
    </>
  );
}
