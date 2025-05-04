import DrawerProvider from "@/context/drawer";
import ModalProvider from "@/context/modal";
import { ThemeProvider } from "@/context/theme";
import React from "react";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <>
      <ThemeProvider>
        <Toaster />
        <ModalProvider>
          <DrawerProvider>{children}</DrawerProvider>
        </ModalProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;
