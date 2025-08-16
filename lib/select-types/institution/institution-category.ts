import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleInstitutionCategory = {
     id:true,name:true
} satisfies Prisma.InstitutionCategorySelect;

export type TSimpleInstitutionCategory = Prisma.InstitutionCategoryGetPayload<{select: typeof SSimpleInstitutionCategory}>;

export const SAdminInstitutionCategory = {
     id:true,name:true, description:true, createdAt:true, 
     _count:{select: {institutions:true}} 
} satisfies Prisma.InstitutionCategorySelect;

export type TAdminInstitutionCategory = Prisma.InstitutionCategoryGetPayload<{select: typeof SAdminInstitutionCategory}>;

export const SInstitutionCategoryUpdate = {
     id:true,name:true, description:true,
} satisfies Prisma.InstitutionCategorySelect;

export type TInstitutionCategoryUpdate = Prisma.InstitutionCategoryGetPayload<{select: typeof SInstitutionCategoryUpdate}>;