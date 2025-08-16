import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleDepartment = {
     id:true,
} satisfies Prisma.DepartmentSelect;

export type TSimpleDepartment = Prisma.DepartmentGetPayload<{select: typeof SSimpleDepartment}>;


export const SDepartmentUpdate = {
     id:true, name:true, description:true
} satisfies Prisma.DepartmentSelect;

export type TDepartmentUpdate = Prisma.DepartmentGetPayload<{select: typeof SDepartmentUpdate}>;

export const SDepartmentTableRow = {
     id:true, name:true, description:true, createdAt: true, institution: {select: {id:true, name:true}}
} satisfies Prisma.DepartmentSelect;

export type TDepartmentTableRow = Prisma.DepartmentGetPayload<{select: typeof SDepartmentTableRow}>;