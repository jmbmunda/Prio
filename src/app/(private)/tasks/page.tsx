import { Task } from "@prisma/client";
import React, { Suspense } from "react";

import { getChecklist } from "@/actions/checklist";
import { getStatusByName, getStatuses } from "@/actions/status";
import TransparentContainer from "@/components/TransparentContainer";

import Checklist from "./components/Checklist";
import SortAndFilter from "./components/SortAndFilter";
import Tasks from "../tasks/components/Tasks";
import ColumnsLoader from "./components/Columns/ColumnsLoader";

type SearchParams = {
  status?: string;
  priority?: string;
  field?: keyof Task;
  sort?: "asc" | "desc";
};

const TasksPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params = await searchParams;
  const checklists = await getChecklist();
  const status = await getStatusByName(params?.status ?? "");
  const statuses = await getStatuses({
    filters: { status_id: status?.id, priority: params?.priority?.toUpperCase() },
    sort: { field: params?.field, order: params?.sort },
  });

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      <TransparentContainer
        title="Recent Tasks"
        hasHeader={false}
        isTransparent
        className="col-span-3 h-max min-h-[70vh]"
      >
        <SortAndFilter />
        <Suspense fallback={<ColumnsLoader />}>
          <Tasks data={statuses} />
        </Suspense>
      </TransparentContainer>
      <TransparentContainer title="Checklist" isTransparent className="col-span-1 h-max">
        <Checklist data={checklists} />
      </TransparentContainer>
    </div>
  );
};

export default TasksPage;
