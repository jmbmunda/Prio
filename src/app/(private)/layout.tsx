import { DrawerProvider } from "@/components/Drawer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <DrawerProvider>
        <Header />
        <Navbar />
        <main className="container py-4 ">{children}</main>
      </DrawerProvider>
    </section>
  );
}
