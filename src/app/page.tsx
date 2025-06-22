"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import GradientText from "@/components/GradientText";
import Loader from "@/components/Loader";
import { LOGO_GRADIENT_COLORS } from "@/components/Navbar/constants";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.replace("/tasks"), 1000);
  }, [router]);

  return (
    <Loader
      title={
        <GradientText colors={LOGO_GRADIENT_COLORS} className="font-bold text-3xl">
          Prio
        </GradientText>
      }
    />
  );
}
