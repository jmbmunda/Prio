import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

type PrismaType = PrismaClient & ReturnType<typeof withAccelerate>;

const globalForPrisma = global as unknown as { prisma: PrismaType };

const prisma = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
