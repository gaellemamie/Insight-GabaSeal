"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createDepartment(data: Prisma.DepartmentCreateInput) {
     try {
          const res = await prisma.department.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating department: ", error);
          return null;
     }
}

export async function updateDepartment(id: string, data: Prisma.DepartmentUpdateInput) {
     try {
          const res = await prisma.department.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating department with id: ${id}`, error);
          return null;
     }
}

export async function deleteDepartment(id: string) {
     try {
          const res = await prisma.department.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting department with id: ", id, error);
          return null;
     }
}

export const fetchDepartment = cache(async <T extends Prisma.DepartmentSelect>(
     selectType: T, search?: Prisma.DepartmentWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.DepartmentOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.DepartmentGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.department.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.department.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching departments: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchDepartmentById = cache(async <T extends Prisma.DepartmentSelect>(id: string, selectType: T): Promise<Prisma.DepartmentGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.department.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching department data for id: ${id}`, error);
          return null;
     }
})