import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleLog = {
     id:true,
} satisfies Prisma.LogSelect;

export type TSimpleLog = Prisma.LogGetPayload<{select: typeof SSimpleLog}>;