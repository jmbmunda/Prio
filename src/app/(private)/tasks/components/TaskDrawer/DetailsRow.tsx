import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
  icon: React.ReactNode;
};

const DetailsRow = ({ icon, label, children }: Props) => {
  return (
    <div className="flex gap-2 items-center text-muted-foreground">
      <span>{icon}</span>
      <span>{label}</span>
      <div>{children}</div>
    </div>
  );
};

export default DetailsRow;
