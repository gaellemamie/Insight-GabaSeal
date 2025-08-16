import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleEmployeeRole = {
     id:true,name:true, signingMark:true,
     department: {select: {id:true, name:true}}
} satisfies Prisma.EmployeeRoleSelect;

export type TSimpleEmployeeRole = Prisma.EmployeeRoleGetPayload<{select: typeof SSimpleEmployeeRole}>;

export const SEmployeeRoleTableRow = {
     id:true, name:true, description:true, department: {select: {id:true, name:true}},
     createdAt:true, signingMark:true
} satisfies Prisma.EmployeeRoleSelect;

export type TEmployeeRoleTableRow = Prisma.EmployeeRoleGetPayload<{select: typeof SEmployeeRoleTableRow}>;

export const SEmployeeRoleUpdate = {
     id:true, name:true, description:true, signingMark: true,
     department:{select:{name:true, id:true,}}
} satisfies Prisma.EmployeeRoleSelect;

export type TEmployeeRoleUpdate = Prisma.EmployeeRoleGetPayload<{select: typeof SEmployeeRoleUpdate}>;