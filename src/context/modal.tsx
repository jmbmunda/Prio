"use client";
import React, { createContext, useContext, useReducer } from "react";

import Modal, { ModalProps } from "@/components/Modal";

export type BaseProps<T extends object = object> = {
  id: string;
  component: React.ElementType;
  props?: T;
} & Partial<ModalProps>;

export type ModalContextType = {
  modals: BaseProps[];
  showModal: <T extends object>(data: BaseProps<Partial<T>>) => void;
  closeModal: (id: string) => void;
};

export enum ModalActionEnum {
  ADD = "ADD",
  REMOVE = "REMOVE",
}

type ModalAction =
  | { type: ModalActionEnum.ADD; payload: BaseProps }
  | { type: ModalActionEnum.REMOVE; payload: { id: string } };

const ModalContext = createContext<ModalContextType | null>(null);

const initialState: ModalContextType = {
  modals: [],
  showModal: () => {},
  closeModal: () => {},
};

const reducer = (state = initialState, action: ModalAction) => {
  switch (action.type) {
    case ModalActionEnum.ADD:
      return { ...state, modals: [...state.modals, action.payload] };
    case ModalActionEnum.REMOVE:
      return { ...state, modals: state.modals.filter((modal) => modal.id !== action.payload.id) };
    default:
      return state;
  }
};

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showModal = (data: BaseProps) => {
    dispatch({ type: ModalActionEnum.ADD, payload: data });
  };

  const closeModal = (id: string) => {
    dispatch({ type: ModalActionEnum.REMOVE, payload: { id } });
  };

  return (
    <ModalContext.Provider value={{ modals: state.modals, showModal, closeModal }}>
      {children}
      {state.modals.map((modal) => {
        const { id, component: Component, onClose, props, ...rest } = modal;
        if (!Component) return null;
        return (
          <Modal
            key={id}
            onClose={() => {
              closeModal(id);
              onClose?.();
            }}
            {...rest}
          >
            <Component
              {...props}
              onClose={() => {
                closeModal(id);
              }}
            />
          </Modal>
        );
      })}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used inside a ModalProvider");
  return context;
};

export default ModalProvider;
