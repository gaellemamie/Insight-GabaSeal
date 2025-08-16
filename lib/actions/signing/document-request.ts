"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createDocumentRequest(data: Prisma.DocumentRequestCreateInput) {
     try {
          const res = await prisma.documentRequest.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating DocumentRequest: ", error);
          return null;
     }
}

export async function updateDocumentRequest(id: string, data: Prisma.DocumentRequestUpdateInput) {
     try {
          const res = await prisma.documentRequest.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating DocumentRequest with id: ${id}`, error);
          return null;
     }
}

export async function deleteDocumentRequest(id: string) {
     try {
          const res = await prisma.documentRequest.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting DocumentRequest with id: ", id, error);
          return null;
     }
}

export const fetchDocumentRequest = cache(async <T extends Prisma.DocumentRequestSelect>(
     selectType: T, search?: Prisma.DocumentRequestWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.DocumentRequestOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.DocumentRequestGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.documentRequest.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.documentRequest.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching DocumentRequests: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchDocumentRequestById = cache(async <T extends Prisma.DocumentRequestSelect>(id: string, selectType: T): Promise<Prisma.DocumentRequestGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.documentRequest.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching DocumentRequest data for id: ${id}`, error);
          return null;
     }
})