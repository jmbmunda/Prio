"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8 content-center">
      <h1 className="font-bold">Prio</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, veniam modi. Eos at ab deserunt consequatur! Quae similique dicta eveniet.
      </p>

      <Link href="/dashboard" className="font-bold text-blue-500">
        Go to dashboard
      </Link>
    </div>
  );
}
