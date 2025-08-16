"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createReminder(data: Prisma.ReminderCreateInput) {
     try {
          const res = await prisma.reminder.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating Reminder: ", error);
          return null;
     }
}

export async function updateReminder(id: string, data: Prisma.ReminderUpdateInput) {
     try {
          const res = await prisma.reminder.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating Reminder with id: ${id}`, error);
          return null;
     }
}

export async function deleteReminder(id: string) {
     try {
          const res = await prisma.reminder.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting Reminder with id: ", id, error);
          return null;
     }
}

export const fetchReminder = cache(async <T extends Prisma.ReminderSelect>(
     selectType: T, search?: Prisma.ReminderWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.ReminderOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.ReminderGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.reminder.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.reminder.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching Reminders: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchReminderById = cache(async <T extends Prisma.ReminderSelect>(id: string, selectType: T): Promise<Prisma.ReminderGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.reminder.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching Reminder data for id: ${id}`, error);
          return null;
     }
})