"use client";

import React from "react";
import { FaFireAlt } from "react-icons/fa";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

import TransparentContainer from "@/components/TransparentContainer";

const data = [
  { name: "In Progress", value: 4, fill: "#8884d8" },
  { name: "Done", value: 8, fill: "#82ca9d" },
  { name: "Todo", value: 16, fill: "#ffc658" },
  { name: "Blocker", value: 2, fill: "#FF0000" },
];

const DashboardPage = () => {
  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);
  const doneData = data.find((item) => item.name === "Done");
  const donePercentage = doneData ? ((doneData.value / totalValue) * 100).toFixed(1) : "0.0";

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-6">
      <TransparentContainer title="Project Status" className="col-span-4">
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-4 bg-yellow-400">
            <span className="text-5xl font-bold">16</span>
            <div className="text-xs leading-tight">
              <p className="text-muted-foreground">Total Projects</p>
              <p className="text-orange-500 flex items-center gap-1 font-bold">
                <FaFireAlt />4 Active
              </p>
            </div>
          </div>
          <div className="w-1/2 h-20 flex justify-evenly items-center bg-yellow-100">
            <ResponsiveContainer className="flex-1">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={35}
                  fill="#8884d8"
                  dataKey="value"
                />
                <text
                  x="50%"
                  y="45%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  {`${donePercentage}%`}
                </text>
                <text
                  x="50%"
                  y="65%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: "10px", fill: "#555" }}
                >
                  {doneData?.name}
                </text>
              </PieChart>
            </ResponsiveContainer>

            <div className="flex-1">
              {data.map((item) => (
                <div key={item.name} className="flex items-center gap-4 text-xs">
                  <div className="w-8 h-1 rounded-sm" style={{ backgroundColor: item.fill }} />
                  <p className="text-muted-foreground">{item.name}</p>
                  <p className="font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TransparentContainer>

      {/* ACTIVITY FEED */}
      <TransparentContainer title="Activity Feed" className="col-span-2">
        List of activities here
      </TransparentContainer>
    </div>
  );
};

export default DashboardPage;
