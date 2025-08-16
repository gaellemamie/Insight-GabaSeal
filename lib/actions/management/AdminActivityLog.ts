"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createAdminActivityLog(data: Prisma.AdminActivityLogCreateInput) {
     try {
          const res = await prisma.adminActivityLog.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating AdminActivityLog: ", error);
          return null;
     }
}

export async function updateAdminActivityLog(id: string, data: Prisma.AdminActivityLogUpdateInput) {
     try {
          const res = await prisma.adminActivityLog.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating AdminActivityLog with id: ${id}`, error);
          return null;
     }
}

export async function deleteAdminActivityLog(id: string) {
     try {
          const res = await prisma.adminActivityLog.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting AdminActivityLog with id: ", id, error);
          return null;
     }
}

export const fetchAdminActivityLog = cache(async <T extends Prisma.AdminActivityLogSelect>(
     selectType: T, search?: Prisma.AdminActivityLogWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.AdminActivityLogOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.AdminActivityLogGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.adminActivityLog.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.adminActivityLog.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching AdminActivityLogs: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchAdminActivityLogById = cache(async <T extends Prisma.AdminActivityLogSelect>(id: string, selectType: T): Promise<Prisma.AdminActivityLogGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.adminActivityLog.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching AdminActivityLog data for id: ${id}`, error);
          return null;
     }
})