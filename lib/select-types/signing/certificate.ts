import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleCertificate = {
     id:true,
} satisfies Prisma.CertificateSelect;

export type TSimpleCertificate = Prisma.CertificateGetPayload<{select: typeof SSimpleCertificate}>;