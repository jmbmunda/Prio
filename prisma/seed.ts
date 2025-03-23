import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: "jason@email.com",
    name: "Jason",
    projects: {
      create: [{ name: "Project 1", color: "blue" }],
    },
    tasks: {
      create: [{ title: "Task 1", description: "Lorem ipsum dolor sit amet." }],
    },
  },
  {
    email: "ann@email.com",
    name: "Ann",
    projects: {
      create: [{ name: "Damdam", color: "pink" }],
    },
    tasks: {
      create: [{ title: "Task 1", description: "Lorem ipsum dolor sit amet." }],
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
