import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleDocumentRequest = {
     id:true,
} satisfies Prisma.DocumentRequestSelect;

export type TSimpleDocumentRequest = Prisma.DocumentRequestGetPayload<{select: typeof SSimpleDocumentRequest}>;

export const SSeekerDocumentRequest = {
     id:true, createdAt: true, description:true, updatedAt:true, status:true, 
     documentType: {select:{id:true, name:true, }}
} satisfies Prisma.DocumentRequestSelect;

export type TSeekerDocumentRequest = Prisma.DocumentRequestGetPayload<{select: typeof SSeekerDocumentRequest}>;