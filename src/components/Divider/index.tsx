import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  thickness?: number;
  color?: string;
  marginY?: string;
  className?: string;
};

const Divider = ({ thickness = 1, color = "#d4d4d4", marginY = "4", className = "" }: Props) => {
  return (
    <hr
      className={cn(`border-0 my-${marginY}`, className)}
      style={{ height: `${thickness}px`, backgroundColor: color }}
    />
  );
};

export default Divider;
