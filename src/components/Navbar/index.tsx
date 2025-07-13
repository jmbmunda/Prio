"use client";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IconType } from "react-icons/lib";
import { TiChevronRight } from "react-icons/ti";

import { useDrawer } from "@/context/drawer";
import { NAVBAR_DRAWER_ID } from "@/lib/constants";
import { cn } from "@/lib/utils";

import GradientText from "../GradientText";
import { HEADER_HEIGHT } from "../Header";
import { LINKS, LOGO_GRADIENT_COLORS } from "./constants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const Drawer = dynamic(() => import("../Drawer"), { ssr: false });

const Navbar = () => {
  const { openDrawers, openDrawer, closeDrawer } = useDrawer();
  const pathname = usePathname();
  const isActiveDrawer = openDrawers.includes(NAVBAR_DRAWER_ID);
  const [showLabel, setShowLabel] = useState(isActiveDrawer);

  const toggleDrawer = () =>
    isActiveDrawer ? closeDrawer(NAVBAR_DRAWER_ID) : openDrawer(NAVBAR_DRAWER_ID);

  return (
    <Drawer
      show={isActiveDrawer}
      close={() => closeDrawer(NAVBAR_DRAWER_ID)}
      closeOnEscape
      closeOnOverlayClick
      isFloating={false}
      width={300}
      onAnimationComplete={() =>
        !isActiveDrawer ? setShowLabel(false) : setTimeout(() => setShowLabel(true), 300)
      }
    >
      <>
        <div className="z-50 grid place-items-center mb-4" style={{ height: HEADER_HEIGHT }}>
          <div className="flex items-center gap-4">
            <Image src="/icon.png" alt="" width={30} height={30} objectFit="contain" />
            {isActiveDrawer && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                transition={{ opacity: { delay: 0.1 }, width: { delay: 0 } }}
              >
                <GradientText colors={LOGO_GRADIENT_COLORS} className="font-bold text-xl">
                  Prio
                </GradientText>
              </motion.div>
            )}
          </div>
          <button
            type="button"
            onClick={toggleDrawer}
            className="rounded-full z-10 absolute -right-5 bg-muted text-purple-500 shadow-sm drop-shadow-lg"
          >
            <TiChevronRight
              size={22}
              className={cn(
                "cursor-pointer m-2 transition duration-800",
                isActiveDrawer && "transform rotate-180"
              )}
            />
          </button>
        </div>

        <ul className="space-y-4 flex flex-col">
          {LINKS.map(({ label, icon: Icon, href, subItems }, idx) => {
            const renderContent = (label: string, Icon: IconType, href?: string) => (
              <Link
                key={idx}
                href={href ?? ""}
                className={cn(
                  "p-4 flex cursor-pointer items-center rounded-md gap-4 hover:text-purple-500",
                  href === pathname && "bg-purple-500 text-white hover:text-white"
                )}
              >
                <Icon size={24} />
                {showLabel && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {label}
                  </motion.span>
                )}
              </Link>
            );

            if (subItems && subItems.length > 0) {
              return (
                <Accordion key={idx} type="single" collapsible>
                  <AccordionItem value={label}>
                    <AccordionTrigger className="py-0 hover:no-underline">
                      {renderContent(label, Icon, href)}
                    </AccordionTrigger>
                    {subItems.map((subItem) => (
                      <AccordionContent
                        key={subItem.href}
                        className={cn("py-0", showLabel && "ml-4")}
                      >
                        {renderContent(subItem.label, subItem.icon, subItem.href)}
                      </AccordionContent>
                    ))}
                  </AccordionItem>
                </Accordion>
              );
            }
            return renderContent(label, Icon, href);
          })}
        </ul>
      </>
    </Drawer>
  );
};

export default Navbar;
