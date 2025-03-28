import ModalProvider from "@/context/modal";
import React from "react";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <>
      <Toaster />
      <ModalProvider>{children}</ModalProvider>
    </>
  );
};

export default Providers;
