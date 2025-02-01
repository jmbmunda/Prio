"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="container w-full h-screen grid place-items-center">
      <div className="space-y-4 text-center">
        <Image src="/not-found.svg" alt="" width={250} height={250} />
        <h2>Not Found</h2>
        <p className="text-gray-500">Could not find requested resource</p>
        <span className="text-blue-500 font-bold hover:text-blue-800">
          <button onClick={() => router.back()}>Go back</button>
        </span>
      </div>
    </div>
  );
}
