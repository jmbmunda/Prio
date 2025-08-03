import { GoTasklist } from "react-icons/go";
import { HiOutlineAdjustmentsVertical, HiOutlineRectangleGroup } from "react-icons/hi2";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { TbTags } from "react-icons/tb";

// import { MdOutlineSpaceDashboard } from "react-icons/md";

export const LINKS = [
  // { label: "Dashboard", icon: MdOutlineSpaceDashboard, href: "/dashboard" },
  { label: "Tasks", icon: GoTasklist, href: "/tasks" },
  // { label: "Projects", icon: GoProjectRoadmap, href: "/projects" },
  { label: "Calendar", icon: IoCalendarNumberOutline, href: "/calendar" },
  {
    label: "Manage",
    icon: HiOutlineAdjustmentsVertical,
    subItems: [
      { label: "Categories", icon: HiOutlineRectangleGroup, href: "/categories" },
      { label: "Tags", icon: TbTags, href: "/tags" },
    ],
  },
];

export const LOGO_GRADIENT_COLORS = ["#107bb5", "#a855f7", "#10b570", "#e3d50b"];
