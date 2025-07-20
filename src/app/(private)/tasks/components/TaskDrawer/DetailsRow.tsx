import React from "react";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
};

const DetailsRow = ({ icon, label, children, className }: Props) => {
  return (
    <div className={cn("flex gap-2 items-center text-muted-foreground", className)}>
      <span>{icon}</span>
      <span>{label}</span>
      <div>{children}</div>
    </div>
  );
};

export default DetailsRow;
