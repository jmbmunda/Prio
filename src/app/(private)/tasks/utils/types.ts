import { Prisma } from "@prisma/client";

export type ColumnType = Prisma.StatusGetPayload<{
  include: { tasks: { include: { images: true } } };
}>;
