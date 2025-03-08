"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import React from "react";
import { FiDelete } from "react-icons/fi";

type Goal = {
  id: string;
  message: string;
  checked: boolean;
  onCheckedChange?: (id: string, checked: boolean) => void;
  removeGoal?: (id: string) => void;
};
const Goal = ({ id, message, checked, onCheckedChange, removeGoal }: Goal) => (
  <li key={id} className="flex flex-1 justify-between items-center p-4 bg-slate-100 space-x-2">
    <div className="flex flex-1 items-center gap-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(checked: boolean) => {
          if (!onCheckedChange) return checked;
          onCheckedChange(id, checked);
        }}
      />
      <label
        htmlFor={id}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          checked && "line-through"
        )}
      >
        {message} Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque asperiores commodi
        reiciendis, corrupti rerum illo quidem ad consequuntur provident repudiandae.
      </label>
    </div>

    {checked && (
      <FiDelete
        onClick={() => removeGoal?.(id)}
        className="cursor-pointer text-gray-500 hover:text-black"
      />
    )}
  </li>
);

const Goals = () => {
  const goalsData: Goal[] = [
    { id: "1", message: "Goal 1", checked: false },
    { id: "2", message: "Goal 2", checked: false },
    { id: "3", message: "Goal 3", checked: false },
    { id: "4", message: "Goal 4", checked: false },
    { id: "5", message: "Goal 5", checked: false },
  ];

  const [goals, setGoals] = React.useState(goalsData);

  const handleCheckedChange = (id: string, checked: boolean) => {
    const updatedGoals = goals.map((goal) => (goal.id === id ? { ...goal, checked } : goal));
    setGoals(updatedGoals);
  };

  const handleRemoveGoal = (id: string) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);
  };

  //   TODO: Add empty state
  // TODO: Customize styling

  return (
    <ul className="space-y-4 overflow-y-auto h-[50vh]">
      {goals.map((goal, idx) => (
        <Goal
          key={idx}
          {...goal}
          removeGoal={handleRemoveGoal}
          onCheckedChange={handleCheckedChange}
        />
      ))}
    </ul>
  );
};

export default Goals;
