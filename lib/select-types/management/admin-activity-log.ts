import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleAdminActivityLog = {
     id:true,
} satisfies Prisma.AdminActivityLogSelect;

export type TSimpleAdminActivityLog = Prisma.AdminActivityLogGetPayload<{select: typeof SSimpleAdminActivityLog}>;