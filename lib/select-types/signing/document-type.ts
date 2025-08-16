import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleDocumentType = {
     id:true, name:true, signingMarkers:true, 
} satisfies Prisma.DocumentTypeSelect;

export type TSimpleDocumentType = Prisma.DocumentTypeGetPayload<{select: typeof SSimpleDocumentType}>;

export const SDocumentTypeUpdate = {
     id:true, name:true, formats:true, templateUrl:true, signingMarkers:true
} satisfies Prisma.DocumentTypeSelect;

export type TDocumentTypeUpdate = Prisma.DocumentTypeGetPayload<{select: typeof SDocumentTypeUpdate}>;

export const SDocumentTypeCard = {
     id:true,name:true, formats:true, signingMarkers:true, createdAt:true, templateUrl:true,
     _count: {select: {documentRequests: true, documents:true}}
} satisfies Prisma.DocumentTypeSelect;

export type TDocumentTypeCard = Prisma.DocumentTypeGetPayload<{select: typeof SDocumentTypeCard}>;