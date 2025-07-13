import { getSchedules } from "@/actions/schedule";
import BigCalendar from "@/app/(private)/calendar/components/BigCalendar";

import { EventType } from "./utils/types";

export default async function CalendarPage() {
  const schedules = await getSchedules();

  const events: EventType[] = schedules.map((sched) => ({ ...sched, title: sched.task.title }));

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center -mt-16">
      <BigCalendar events={events} />
    </div>
  );
}
