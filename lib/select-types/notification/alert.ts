import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleAlert = {
     id:true,
} satisfies Prisma.AlertSelect;

export type TSimpleAlert = Prisma.AlertGetPayload<{select: typeof SSimpleAlert}>;