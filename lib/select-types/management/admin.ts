import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleAdmin = {
     id:true,name:true, userId:true
} satisfies Prisma.AdminSelect;

export type TSimpleAdmin = Prisma.AdminGetPayload<{select: typeof SSimpleAdmin}>;

export const SAdminTableRow = {
     id:true, name:true, status:true, role:true, createdAt:true,email:true
} satisfies Prisma.AdminSelect;

export type TAdminTableRow = Prisma.AdminGetPayload<{select: typeof SAdminTableRow}>;

export const SAdminUpdate= {
     id:true, name:true, status:true, role:true, email:true, userId:true
} satisfies Prisma.AdminSelect;

export type TAdminUpdate = Prisma.AdminGetPayload<{select: typeof SAdminUpdate}>;