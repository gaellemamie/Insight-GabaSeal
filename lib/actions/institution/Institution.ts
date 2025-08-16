"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createInstitution(data: Prisma.institutionCreateInput) {
     try {
          const res = await prisma.institution.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating Institution: ", error);
          return null;
     }
}

export async function updateInstitution(id: string, data: Prisma.institutionUpdateInput) {
     try {
          const res = await prisma.institution.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating Institution with id: ${id}`, error);
          return null;
     }
}

export async function deleteInstitution(id: string) {
     try {
          const res = await prisma.institution.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting Institution with id: ", id, error);
          return null;
     }
}

export const fetchInstitution = cache(async <T extends Prisma.institutionSelect>(
     selectType: T, search?: Prisma.institutionWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.institutionOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.institutionGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.institution.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.institution.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching Institutions: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchInstitutionById = cache(async <T extends Prisma.institutionSelect>(id: string, selectType: T): Promise<Prisma.institutionGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.institution.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching Institution data for id: ${id}`, error);
          return null;
     }
})