import { Event } from "react-big-calendar";

import { getSchedules } from "@/actions/schedule";

export type Schedules = Awaited<ReturnType<typeof getSchedules>>;

export type EventType = {
  [P in keyof Event]?: Event[P] | null;
} & Schedules[number];
