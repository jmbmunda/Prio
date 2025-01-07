"use client";
import { useDrawer } from "@/components/Drawer";

export default function Home() {
  const { open } = useDrawer();

  return (
    <div className="p-8">
      <button onClick={open}>Open Drawer</button>
      <h1>Sample</h1>
    </div>
  );
}
