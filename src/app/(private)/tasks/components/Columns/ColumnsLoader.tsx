import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const ColumnsLoader = () => {
  return (
    <div className="grid grid-cols-4 py-8 h-full min-h-[70vh] w-full gap-2">
      <Skeleton className="h-full w-full" />
      <Skeleton className="h-full w-full" />
      <Skeleton className="h-full w-full" />
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export default ColumnsLoader;
