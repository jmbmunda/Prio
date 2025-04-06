import React from "react";
import Checklist from "../tasks/components/Checklist";
import Tasks from "../tasks/components/Tasks";
import TransparentContainer from "@/components/TransparentContainer";

const TasksPage = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      <TransparentContainer title="Recent Tasks" isTransparent className="col-span-3 h-max">
        <Tasks />
      </TransparentContainer>
      <TransparentContainer title="Checklist" isTransparent className="col-span-1 h-max">
        <Checklist />
      </TransparentContainer>
    </div>
  );
};

export default TasksPage;
