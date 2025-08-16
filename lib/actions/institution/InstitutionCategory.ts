"use server";


import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";
import prisma from "@/lib/prisma";

export async function createInstitutionCategory(data: Prisma.InstitutionCategoryCreateInput) {
     try {
          const res = await prisma.institutionCategory.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating InstitutionCategory: ", error);
          return null;
     }
}

export async function updateInstitutionCategory(id: string, data: Prisma.InstitutionCategoryUpdateInput) {
     try {
          const res = await prisma.institutionCategory.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating InstitutionCategory with id: ${id}`, error);
          return null;
     }
}

export async function deleteInstitutionCategory(id: string) {
     try {
          const res = await prisma.institutionCategory.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting InstitutionCategory with id: ", id, error);
          return null;
     }
}

export const fetchInstitutionCategory = cache(async <T extends Prisma.InstitutionCategorySelect>(
     selectType: T, search?: Prisma.InstitutionCategoryWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.InstitutionCategoryOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.InstitutionCategoryGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.institutionCategory.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.institutionCategory.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching InstitutionCategorys: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchInstitutionCategoryById = cache(async <T extends Prisma.InstitutionCategorySelect>(id: string, selectType: T): Promise<Prisma.InstitutionCategoryGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.institutionCategory.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching InstitutionCategory data for id: ${id}`, error);
          return null;
     }
})