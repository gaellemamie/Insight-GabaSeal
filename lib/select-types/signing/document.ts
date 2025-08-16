import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleDocument = {
     id:true,
} satisfies Prisma.DocumentSelect;

export type TSimpleDocument = Prisma.DocumentGetPayload<{select: typeof SSimpleDocument}>;

export const SDocumentUpdate = {
     id:true, name:true, url:true, seekerId:true, signedBy:true, unSignedBy:true, 
     documentType: {select: {id: true, name:true, signingMarkers:true, }}
} satisfies Prisma.DocumentSelect;

export type TDocumentUpdate = Prisma.DocumentGetPayload<{select: typeof SDocumentUpdate}>;

export const SDocumentTableRow = {
     id:true, name:true, url:true, signedBy:true, unSignedBy:true, createdAt:true, updatedAt:true, 
     documentType: {select: {id:true, name:true, }}
} satisfies Prisma.DocumentSelect;

export type TDocumentTableRow = Prisma.DocumentGetPayload<{select: typeof SDocumentTableRow}>;

export const SSeekerDocument = {
     id:true, name:true, documentType: {select: {name:true}},
     createdAt: true, updatedAt:true, url:true
} satisfies Prisma.DocumentSelect;

export type TSeekerDocument = Prisma.DocumentGetPayload<{select: typeof SSeekerDocument}>;