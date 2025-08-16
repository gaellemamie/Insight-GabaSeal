"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createAlert(data: Prisma.AlertCreateInput) {
     try {
          const res = await prisma.alert.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating Alert: ", error);
          return null;
     }
}

export async function updateAlert(id: string, data: Prisma.AlertUpdateInput) {
     try {
          const res = await prisma.alert.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating Alert with id: ${id}`, error);
          return null;
     }
}

export async function deleteAlert(id: string) {
     try {
          const res = await prisma.alert.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting Alert with id: ", id, error);
          return null;
     }
}

export const fetchAlert = cache(async <T extends Prisma.AlertSelect>(
     selectType: T, search?: Prisma.AlertWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.AlertOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.AlertGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.alert.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.alert.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching Alerts: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchAlertById = cache(async <T extends Prisma.AlertSelect>(id: string, selectType: T): Promise<Prisma.AlertGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.alert.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching Alert data for id: ${id}`, error);
          return null;
     }
})