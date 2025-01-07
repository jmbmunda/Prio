import React from "react";
import { Props } from "./types";

const Container = ({ children }: Props) => {
  return <div className="mx-12">{children}</div>;
};

export default Container;
