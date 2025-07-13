"use client";

import dayjs from "dayjs";
import React, { useMemo } from "react";
import { Calendar, Views, dayjsLocalizer, CalendarProps } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { createPortal } from "react-dom";

import { EventType } from "@/app/(private)/calendar/utils/types";
import TaskMenu from "@/app/(private)/tasks/components/ContextMenu/TaskMenu";
import TaskEditorModal from "@/app/(private)/tasks/components/TaskEditorModal";
import useTask from "@/app/(private)/tasks/hooks/useTask";
import { useModal } from "@/context/modal";
import { TASK_MENU_ID } from "@/lib/constants";
import { determineHexContrast } from "@/lib/helpers";

import * as dates from "../../../../../lib/dates";
import CustomEvent from "../CustomEvent";

const dLocalizer = dayjsLocalizer(dayjs);

type Props = {
  events: EventType[];
} & Partial<Omit<CalendarProps, "events">>;

const BigCalendar = ({ events, localizer = dLocalizer }: Props) => {
  const { showModal } = useModal();
  const { onTaskClick, onDeleteTaskClick } = useTask();

  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        event: CustomEvent,
        timeSlotWrapper: (props: React.ComponentPropsWithoutRef<"div">) => (
          <div style={{ backgroundColor: "lightblue" }} {...props} />
        ),
      },
      defaultDate: new Date(),
      max: dates.add(dates.endOf(new Date(), "day"), -1, "hours"),
      views: Object.keys(Views).map((k) => Views[k as keyof typeof Views]),
    }),
    []
  );

  return (
    <div className="h-[600px] w-full p-4 shadow-sm rounded-sm">
      <Calendar
        components={components}
        defaultDate={defaultDate}
        events={events}
        localizer={localizer}
        max={max}
        showMultiDayTimes
        step={60}
        views={views}
        popup
        selectable
        onSelectSlot={({ start, end }) => {
          showModal({
            id: "add-task",
            title: "Add Task",
            component: TaskEditorModal,
            props: {
              editValues: { start_date: start, due_date: end },
              onClose: () => {},
            },
          });
        }}
        onSelectEvent={(event) => onTaskClick(event.task_id)}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.task.status?.color,
            color: !!determineHexContrast(event.task.status?.color) ? "black" : "white",
          },
        })}
      />

      {createPortal(
        <TaskMenu
          id={TASK_MENU_ID}
          // onEditClick={onEditColumnClick}
          onDeleteClick={onDeleteTaskClick}
        />,
        document.body
      )}
    </div>
  );
};

export default BigCalendar;
