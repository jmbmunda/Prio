import React from "react";

import { getChecklist } from "@/actions/checklist";
import { getStatuses } from "@/actions/status";
import TransparentContainer from "@/components/TransparentContainer";

import Checklist from "./components/Checklist";
import Tasks from "../tasks/components/Tasks";

const TasksPage = async () => {
  const statuses = await getStatuses();
  const checklists = await getChecklist();

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      <TransparentContainer title="Recent Tasks" isTransparent className="col-span-3 h-max">
        <Tasks data={statuses} />
      </TransparentContainer>
      <TransparentContainer title="Checklist" isTransparent className="col-span-1 h-max">
        <Checklist data={checklists} />
      </TransparentContainer>
    </div>
  );
};

export default TasksPage;
