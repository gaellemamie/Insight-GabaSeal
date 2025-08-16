import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleAttachment = {
     id:true,
} satisfies Prisma.AttachmentSelect;

export type TSimpleAttachment = Prisma.AttachmentGetPayload<{select: typeof SSimpleAttachment}>;