"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Projects", path: "/projects" },
  { label: "Calendar", path: "/calendar" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <nav className="shadow-md h-12 bg-background">
      <div className="container flex items-center h-full">
        <div className="flex gap-2 items-center">
          <Image src="/icon.png" alt="" width={35} height={35} objectFit="contain" />
          <h3 className="font-bold">Logo</h3>
        </div>
        <ul className="flex gap-4 items-center h-full mx-12">
          {links.map(({ label, path }) => (
            <li key={label} className={cn("nav-link", path === pathname && "active-nav-link")}>
              <Link href={path}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
