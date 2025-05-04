import { GoProjectRoadmap, GoTasklist } from "react-icons/go";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export const LINKS = [
  { label: "Dashboard", icon: MdOutlineSpaceDashboard, href: "/dashboard" },
  { label: "Tasks", icon: GoTasklist, href: "/tasks" },
  { label: "Projects", icon: GoProjectRoadmap, href: "/projects" },
  { label: "Calendar", icon: IoCalendarNumberOutline, href: "/calendar" },
];

export const LOGO_GRADIENT_COLORS = ["#107bb5", "#a855f7", "#10b570", "#e3d50b"];
