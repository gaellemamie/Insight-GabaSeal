import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleNotification = {
     id:true,
} satisfies Prisma.NotificationSelect;

export type TSimpleNotification = Prisma.NotificationGetPayload<{select: typeof SSimpleNotification}>;