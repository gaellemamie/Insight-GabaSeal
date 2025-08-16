"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createEmployeeRole(data: Prisma.EmployeeRoleCreateInput) {
     try {
          const res = await prisma.employeeRole.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating EmployeeRole: ", error);
          return null;
     }
}

export async function updateEmployeeRole(id: string, data: Prisma.EmployeeRoleUpdateInput) {
     try {
          const res = await prisma.employeeRole.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating EmployeeRole with id: ${id}`, error);
          return null;
     }
}

export async function deleteEmployeeRole(id: string) {
     try {
          const res = await prisma.employeeRole.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting EmployeeRole with id: ", id, error);
          return null;
     }
}

export const fetchEmployeeRole = cache(async <T extends Prisma.EmployeeRoleSelect>(
     selectType: T, search?: Prisma.EmployeeRoleWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.EmployeeRoleOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.EmployeeRoleGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.employeeRole.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.employeeRole.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching EmployeeRoles: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchEmployeeRoleById = cache(async <T extends Prisma.EmployeeRoleSelect>(id: string, selectType: T): Promise<Prisma.EmployeeRoleGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.employeeRole.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching EmployeeRole data for id: ${id}`, error);
          return null;
     }
})