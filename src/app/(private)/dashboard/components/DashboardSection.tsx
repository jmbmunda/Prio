import { cn } from "@/lib/utils";
import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";

type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const DashboardSection = ({ title, children, className }: Props) => {
  return (
    <section className={cn("p-4 bg-background shadow-md rounded-md", className)}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer">
          <p className="font-bold text-xl">{title}</p>
          <FaChevronRight />
        </div>
        <IoIosAddCircleOutline size={30} className="cursor-pointer hover:text-purple-500" />
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
};

export default DashboardSection;
