import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimplePasswordResetToken = {
     id:true,
} satisfies Prisma.PasswordResetTokenSelect;

export type TSimplePasswordResetToken = Prisma.PasswordResetTokenGetPayload<{select: typeof SSimplePasswordResetToken}>;