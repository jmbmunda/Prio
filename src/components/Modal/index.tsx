import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React from "react";

export type ModalProps = {
  show?: boolean;
  as?: React.ElementType;
  title?: string;
  onClose: () => void;
  dismissOnBackdropClick?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Modal = ({
  show = true,
  as = "div",
  title,
  onClose,
  dismissOnBackdropClick = true,
  children,
}: ModalProps) => {
  return (
    <Dialog
      open={show}
      as={as}
      className="relative z-10 focus:outline-none"
      onClose={dismissOnBackdropClick ? onClose : () => {}}
    >
      <div className="fixed bg-black/50 inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-background/80 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(10%)] data-[closed]:opacity-0"
          >
            {title && (
              <DialogTitle as="h3" className="text-base/7 font-semibold text-foreground mb-2">
                {title}
              </DialogTitle>
            )}
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
