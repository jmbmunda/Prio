import React from "react";
import { useContextMenu } from "react-contexify";

import { TASK_MENU_ID } from "@/lib/constants";

import { EventType } from "../../utils/types";

const CustomEvent: React.FC<{ event: EventType }> = ({ event }) => {
  const { show } = useContextMenu({ id: TASK_MENU_ID });

  return (
    <div
      onContextMenu={(e) => {
        show({
          event: e,
          position: { x: e.clientX, y: e.clientY },
          props: { id: event.task_id },
        });
      }}
      className="truncate px-2 py-1"
    >
      <strong>{event.title}</strong>
    </div>
  );
};

export default CustomEvent;
