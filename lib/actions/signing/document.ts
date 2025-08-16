"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createDocument(data: Prisma.DocumentCreateInput) {
     try {
          const res = await prisma.document.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating Document: ", error);
          return null;
     }
}

export async function updateDocument(id: string, data: Prisma.DocumentUpdateInput) {
     try {
          const res = await prisma.document.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating Document with id: ${id}`, error);
          return null;
     }
}

export async function deleteDocument(id: string) {
     try {
          const res = await prisma.document.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting Document with id: ", id, error);
          return null;
     }
}

export const fetchDocument = cache(async <T extends Prisma.DocumentSelect>(
     selectType: T, search?: Prisma.DocumentWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.DocumentOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.DocumentGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.document.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.document.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching Documents: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchDocumentById = cache(async <T extends Prisma.DocumentSelect>(id: string, selectType: T): Promise<Prisma.DocumentGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.document.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching Document data for id: ${id}`, error);
          return null;
     }
})