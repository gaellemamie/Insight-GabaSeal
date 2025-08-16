import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleReminder = {
     id:true,
} satisfies Prisma.ReminderSelect;

export type TSimpleReminder = Prisma.ReminderGetPayload<{select: typeof SSimpleReminder}>;