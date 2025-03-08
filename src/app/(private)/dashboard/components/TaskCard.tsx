import Sortable from "@/components/Sortable";
import React from "react";
import { CiClock2 } from "react-icons/ci";
import { GoCommentDiscussion } from "react-icons/go";
import { Task } from "../utils/types";
import Image from "next/image";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <Sortable id={task.id} className="shadow-md bg-white p-4 rounded-md cursor-pointer">
      {/* HEADER */}
      <div className="flex gap-2 mb-2 items-center justify-between text-xs">
        <p className="bg-red-100 text-red-800 font-semibold px-2 rounded-md">High</p>
        <p className="text-gray-500">LDS-192</p>
      </div>

      <p className="font-semibold text-base truncate">Task {task.id}</p>

      <p className="text-xs text-gray-700 truncate text-nowrap">
        Lorem ipsum dolor sit asdsakdasdjaskdjasd askdjsaldkjasdksajdk jasdksajdksajdkasdjkasasjdk
        sajdkasdjkasamet.
      </p>

      <div className="grid grid-cols-7 h-[1.5rem] overflow-x-hidden my-2">
        {task?.images?.map((image) => (
          <Image
            key={image.url}
            src={image.url ?? ""}
            alt=""
            width={96}
            height={96}
            className="w-[1.5rem] h-[1.5rem] object-cover rounded-sm"
          />
        ))}
        {task.images && task.images?.length > 6 && (
          <button className="w-[1.5rem] h-[1.5rem] text-[0.5rem] text-gray-800 bg-gray-200 rounded-sm">
            {task.images?.length}
          </button>
        )}
      </div>

      {/* DIVIDER */}
      <div className="bg-gray-300 h-[0.08rem] my-4" />

      {/* FOOTER */}
      <div className="flex justify-between gap-2 text-xs text-gray-500">
        <p className="flex gap-1 items-center">
          <CiClock2 /> 2 days ago
        </p>

        <span className="flex gap-1 items-center hover:text-gray-800">
          <GoCommentDiscussion />
          10
        </span>
      </div>
    </Sortable>
  );
};

export default TaskCard;
