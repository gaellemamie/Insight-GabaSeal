import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleMessage = {
     id:true,
} satisfies Prisma.MessageSelect;

export type TSimpleMessage = Prisma.MessageGetPayload<{select: typeof SSimpleMessage}>;