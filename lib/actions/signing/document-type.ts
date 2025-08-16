"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createDocumentType(data: Prisma.DocumentTypeCreateInput) {
     try {
          const res = await prisma.documentType.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating DocumentType: ", error);
          return null;
     }
}

export async function updateDocumentType(id: string, data: Prisma.DocumentTypeUpdateInput) {
     try {
          const res = await prisma.documentType.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating DocumentType with id: ${id}`, error);
          return null;
     }
}

export async function deleteDocumentType(id: string) {
     try {
          const res = await prisma.documentType.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting DocumentType with id: ", id, error);
          return null;
     }
}

export const fetchDocumentType = cache(async <T extends Prisma.DocumentTypeSelect>(
     selectType: T, search?: Prisma.DocumentTypeWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.DocumentTypeOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.DocumentTypeGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.documentType.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.documentType.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching DocumentTypes: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchDocumentTypeById = cache(async <T extends Prisma.DocumentTypeSelect>(id: string, selectType: T): Promise<Prisma.DocumentTypeGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.documentType.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching DocumentType data for id: ${id}`, error);
          return null;
     }
})