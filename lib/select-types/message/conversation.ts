import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleConversation = {
     id:true,
} satisfies Prisma.ConversationSelect;

export type TSimpleConversation = Prisma.ConversationGetPayload<{select: typeof SSimpleConversation}>;