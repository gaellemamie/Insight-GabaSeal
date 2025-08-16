"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createEmployee(data: Prisma.EmployeeCreateInput) {
     try {
          const res = await prisma.employee.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating Employee: ", error);
          return null;
     }
}

export async function updateEmployee(id: string, data: Prisma.EmployeeUpdateInput) {
     try {
          const res = await prisma.employee.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating Employee with id: ${id}`, error);
          return null;
     }
}

export async function deleteEmployee(id: string) {
     try {
          const res = await prisma.employee.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting Employee with id: ", id, error);
          return null;
     }
}

export const fetchEmployee = cache(async <T extends Prisma.EmployeeSelect>(
     selectType: T, search?: Prisma.EmployeeWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.EmployeeOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.EmployeeGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.employee.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.employee.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching Employees: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchEmployeeById = cache(async <T extends Prisma.EmployeeSelect>(id: string, selectType: T): Promise<Prisma.EmployeeGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.employee.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching Employee data for id: ${id}`, error);
          return null;
     }
})

