"use client";

import { Props as DrawerProps } from "@/components/Drawer";
import React, { createContext, useContext, useReducer } from "react";

export type BaseProps<T extends object = object> = {
  id: string;
  component: React.ElementType;
  props?: T;
} & Partial<DrawerProps>;

export type DrawerContextType = {
  openDrawers: string[];
  openDrawer: (id: string) => void;
  closeDrawer: (id: string) => void;
};

export enum DrawerActionEnum {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

type DrawerAction = {
  type: DrawerActionEnum.OPEN | DrawerActionEnum.CLOSE;
  payload: { id: string };
};

const DrawerContext = createContext<DrawerContextType | null>(null);

const initialState: DrawerContextType = {
  openDrawers: [],
  openDrawer: () => {},
  closeDrawer: () => {},
};

const reducer = (state = initialState, action: DrawerAction) => {
  const { openDrawers } = state;
  switch (action.type) {
    case DrawerActionEnum.OPEN:
      return { ...state, openDrawers: [...openDrawers, action.payload.id] };
    case DrawerActionEnum.CLOSE:
      return {
        ...state,
        openDrawers: openDrawers.filter((id) => id !== action.payload.id),
      };
    default:
      return state;
  }
};

const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openDrawer = (id: string) => dispatch({ type: DrawerActionEnum.OPEN, payload: { id } });
  const closeDrawer = (id: string) => dispatch({ type: DrawerActionEnum.CLOSE, payload: { id } });

  return (
    <DrawerContext.Provider value={{ openDrawers: state.openDrawers, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) throw new Error("useDrawer must be used inside a DrawerProvider");
  return context;
};

export default DrawerProvider;
