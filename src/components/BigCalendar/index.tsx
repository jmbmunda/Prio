"use client";

import dayjs from "dayjs";
import React, { useMemo } from "react";
import { Calendar, Views, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { determineHexContrast } from "@/lib/helpers";
import { events } from "@/lib/mockData/events";

import * as dates from "../../lib/dates";

const dLocalizer = dayjsLocalizer(dayjs);

const BigCalendar = ({ localizer = dLocalizer }) => {
  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: (props: React.ComponentPropsWithoutRef<"div">) => (
          <div style={{ backgroundColor: "lightblue" }} {...props} />
        ),
      },
      defaultDate: new Date(2015, 3, 1),
      max: dates.add(dates.endOf(new Date(2015, 17, 1), "day"), -1, "hours"),
      views: Object.keys(Views).map((k) => Views[k as keyof typeof Views]),
    }),
    []
  );

  return (
    <div className="h-[600px] w-full p-4 shadow-sm rounded-sm">
      {/* <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      /> */}
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
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.backgroundColor,
            color: !!determineHexContrast(event.backgroundColor) ? "black" : "white",
          },
        })}
      />
    </div>
  );
};

export default BigCalendar;
