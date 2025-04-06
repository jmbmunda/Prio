import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  isTransparent?: boolean;
  hasHeader?: boolean;
  className?: string;
};

const TransparentContainer = ({
  title,
  children,
  isTransparent,
  hasHeader = true,
  className,
}: Props) => {
  return (
    <section
      className={cn(
        `p-4 shadow-sm rounded-xl border border-gray-500 border-opacity-10`,
        isTransparent
          ? `bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10`
          : "bg-background",
        className
      )}
    >
      {hasHeader && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="font-bold text-xl">{title}</p>
            {/* <FaChevronRight /> */}
          </div>
          {/* <IoIosAddCircleOutline size={30} className="cursor-pointer hover:text-purple-500" /> */}
        </div>
      )}
      {children}
    </section>
  );
};

export default TransparentContainer;
