"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createNotification(data: Prisma.NotificationCreateInput) {
     try {
          const res = await prisma.notification.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating Notification: ", error);
          return null;
     }
}

export async function updateNotification(id: string, data: Prisma.NotificationUpdateInput) {
     try {
          const res = await prisma.notification.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating Notification with id: ${id}`, error);
          return null;
     }
}

export async function deleteNotification(id: string) {
     try {
          const res = await prisma.notification.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting Notification with id: ", id, error);
          return null;
     }
}

export const fetchNotification = cache(async <T extends Prisma.NotificationSelect>(
     selectType: T, search?: Prisma.NotificationWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.NotificationOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.NotificationGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.notification.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.notification.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching Notifications: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchNotificationById = cache(async <T extends Prisma.NotificationSelect>(id: string, selectType: T): Promise<Prisma.NotificationGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.notification.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching Notification data for id: ${id}`, error);
          return null;
     }
})