import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const TaskDetailsLoader = () => {
  return (
    <div className="flex py-8 flex-col w-full gap-2">
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-32 h-4" />
      <Skeleton className="w-32 h-4" />
      <Skeleton className="w-32 h-4" />
      <Skeleton className="w-32 h-4" />
      <Skeleton className="w-48 h-4" />

      <Skeleton className="w-full h-40" />
      <div className="flex gap-2">
        <Skeleton className="size-28 rounded-md" />
        <Skeleton className="size-28 rounded-md" />
      </div>
    </div>
  );
};

export default TaskDetailsLoader;
