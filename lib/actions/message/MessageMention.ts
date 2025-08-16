"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createMessageMention(data: Prisma.MessageMentionCreateInput) {
     try {
          const res = await prisma.messageMention.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating MessageMention: ", error);
          return null;
     }
}

export async function updateMessageMention(id: string, data: Prisma.MessageMentionUpdateInput) {
     try {
          const res = await prisma.messageMention.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating MessageMention with id: ${id}`, error);
          return null;
     }
}

export async function deleteMessageMention(id: string) {
     try {
          const res = await prisma.messageMention.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting MessageMention with id: ", id, error);
          return null;
     }
}

export const fetchMessageMention = cache(async <T extends Prisma.MessageMentionSelect>(
     selectType: T, search?: Prisma.MessageMentionWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.MessageMentionOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.MessageMentionGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.messageMention.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.messageMention.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching MessageMentions: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchMessageMentionById = cache(async <T extends Prisma.MessageMentionSelect>(id: string, selectType: T): Promise<Prisma.MessageMentionGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.messageMention.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching MessageMention data for id: ${id}`, error);
          return null;
     }
})