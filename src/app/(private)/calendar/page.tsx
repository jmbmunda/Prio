import Loader from "@/components/Loader";
import prisma from "@/lib/prisma";

export default async function CalendarPage() {
  const users = await prisma.user.findMany();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-foreground">
        Users
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.name}
          </li>
        ))}
      </ol>

      <Loader />
    </div>
  );
}
