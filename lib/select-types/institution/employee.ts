import { Department } from './../../../prisma/lib/generated/prisma/index.d';
import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleEmployee = {
     id:true,
} satisfies Prisma.EmployeeSelect;

export type TSimpleEmployee = Prisma.EmployeeGetPayload<{select: typeof SSimpleEmployee}>;

export const SEmployeeUpdate = {
     id:true,name:true, email:true, role:true, status:true, phone:true, userId:true,
     employeeRole: {select: {id:true, name:true, department: {select: {id:true, name:true}}}}
} satisfies Prisma.EmployeeSelect;

export type TEmployeeUpdate = Prisma.EmployeeGetPayload<{select: typeof SEmployeeUpdate}>;

export const SEmployeeTableRow = {
     id:true,name:true, email:true, role:true, status:true, phone:true, userId:true, createdAt:true,
     employeeRole: {select: {id:true, name:true, department: {select: {id:true, name:true}}}}
} satisfies Prisma.EmployeeSelect;
export type TEmployeeTableRow = Prisma.EmployeeGetPayload<{select: typeof SEmployeeTableRow}>;

export const SAuthEmployee = {
     id:true,name:true, email:true, role:true, status:true, phone:true, userId:true, createdAt:true,
     employeeRole: {
          select: {
               id:true, name:true,signingMark:true,
               department: {
                    select: {
                         id:true, name:true, 
                         institution: {
                              select: {id:true, name:true, email:true, status:true, field:true, }
                         }
                    }
               }
          }
     }
} satisfies Prisma.EmployeeSelect;
export type TAuthEmployee = Prisma.EmployeeGetPayload<{select: typeof SAuthEmployee}>;
