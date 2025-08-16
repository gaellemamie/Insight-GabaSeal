"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createLog(data: Prisma.LogCreateInput) {
     try {
          const res = await prisma.log.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating Log: ", error);
          return null;
     }
}

export async function updateLog(id: string, data: Prisma.LogUpdateInput) {
     try {
          const res = await prisma.log.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating Log with id: ${id}`, error);
          return null;
     }
}

export async function deleteLog(id: string) {
     try {
          const res = await prisma.log.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting Log with id: ", id, error);
          return null;
     }
}

export const fetchLog = cache(async <T extends Prisma.LogSelect>(
     selectType: T, search?: Prisma.LogWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.LogOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.LogGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.log.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.log.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching Logs: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchLogById = cache(async <T extends Prisma.LogSelect>(id: string, selectType: T): Promise<Prisma.LogGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.log.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching Log data for id: ${id}`, error);
          return null;
     }
})