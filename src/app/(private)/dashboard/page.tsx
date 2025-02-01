import React from "react";
import DashboardSection from "./components/DashboardSection";
import Goals from "./components/Goals";
import { CiClock2 } from "react-icons/ci";

const DashboardPage = () => {
  return (
    <div className="grid gap-4 grid-cols-4">
      <DashboardSection title="Recent Tasks" className="col-span-3">
        <div className="grid grid-cols-4 gap-4">
          <div className="shadow-md bg-white p-6 rounded-md">
            <p className="font-semibold text-lg">Task 1</p>
            <p className="text-sm text-gray-800">Lorem ipsum dolor sit amet.</p>
            <p className="flex gap-2 items-center text-xs text-gray-500">
              <CiClock2 /> 2 days ago
            </p>
          </div>
        </div>
      </DashboardSection>
      <DashboardSection title="Goals" className="col-span-1">
        <Goals />
      </DashboardSection>
    </div>
  );
};

export default DashboardPage;
