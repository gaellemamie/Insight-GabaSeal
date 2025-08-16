import { Prisma } from "@/prisma/lib/generated/prisma";
import { SEmployeeTableRow } from "./employee";


export const SSimpleInstitution = {
     id:true,
} satisfies Prisma.institutionSelect;

export type TSimpleInstitution = Prisma.institutionGetPayload<{select: typeof SSimpleInstitution}>;

export const SAdminInstitution = {
     id:true,name:true, phone:true, email:true, address:true, location:true, createdAt:true,
     category: {select:{name:true, id:true}}, serviceType:true
} satisfies Prisma.institutionSelect;

export type TAdminInstitution = Prisma.institutionGetPayload<{select: typeof SAdminInstitution}>;

export const SInstitutionUpdate = {
     id:true,name:true, phone:true, email:true, location:true, status:true, serviceType:true,
     category: {select:{name:true, id:true}}
} satisfies Prisma.institutionSelect;

export type TInstitutionUpdate = Prisma.institutionGetPayload<{select: typeof SInstitutionUpdate}>;

export const SEmployeeFormInstitution = {
     id:true,name:true, 
     departments: {select: {id:true, name:true, roles: {select:{name:true, id:true}}}}
} satisfies Prisma.institutionSelect;

export type TEmployeeFormInstitution = Prisma.institutionGetPayload<{select: typeof SEmployeeFormInstitution}>;

export const SInstitutionView = {
     id:true,name:true, createdAt:true, updatedAt:true,
     departments: {
          select: {
               id:true, name:true, description:true, createdAt: true, institution: {select: {id:true, name:true}},
               roles: {
                         select:{
                         id:true, name:true, description:true, department: {select: {id:true, name:true}},
                         createdAt:true,
                         employee: {select:SEmployeeTableRow}
                    }
               }
          }
     }
} satisfies Prisma.institutionSelect;

export type TInstitutionView = Prisma.institutionGetPayload<{select: typeof SInstitutionView}>;

export const SInstitutionSeeker = {
     id:true, name:true, email:true, phone:true, location:true, serviceType:true, createdAt:true,
     category: {select: {name:true}}
} satisfies Prisma.institutionSelect;

export type TInstitutionSeeker = Prisma.institutionGetPayload<{select: typeof SInstitutionSeeker}>;