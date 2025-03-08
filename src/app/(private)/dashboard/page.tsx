import React from "react";
import DashboardSection from "./components/DashboardSection";
import Goals from "./components/Goals";
import Tasks from "./components/Tasks";

const DashboardPage = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      <DashboardSection title="Recent Tasks" isTransparent className="col-span-3 h-max">
        <Tasks />
      </DashboardSection>
      <DashboardSection title="Goals" isTransparent className="col-span-1 h-max">
        <Goals />
      </DashboardSection>
    </div>
  );
};

export default DashboardPage;
