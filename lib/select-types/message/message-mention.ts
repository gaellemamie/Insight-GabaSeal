import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleMessageMention = {
     id:true,
} satisfies Prisma.MessageMentionSelect;

export type TSimpleMessageMention = Prisma.MessageMentionGetPayload<{select: typeof SSimpleMessageMention}>;