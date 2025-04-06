import { DrawerProvider } from "@/components/Drawer";
import Header from "@/components/Header";
import MainContainer from "@/components/MainContainer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <DrawerProvider>
        <MainContainer>
          <Header />
          {children}
        </MainContainer>
      </DrawerProvider>
    </section>
  );
}
