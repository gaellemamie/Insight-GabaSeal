"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createConversation(data: Prisma.ConversationCreateInput) {
     try {
          const res = await prisma.conversation.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating Conversation: ", error);
          return null;
     }
}

export async function updateConversation(id: string, data: Prisma.ConversationUpdateInput) {
     try {
          const res = await prisma.conversation.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating Conversation with id: ${id}`, error);
          return null;
     }
}

export async function deleteConversation(id: string) {
     try {
          const res = await prisma.conversation.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting Conversation with id: ", id, error);
          return null;
     }
}

export const fetchConversation = cache(async <T extends Prisma.ConversationSelect>(
     selectType: T, search?: Prisma.ConversationWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.ConversationOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.ConversationGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.conversation.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.conversation.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching Conversations: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchConversationById = cache(async <T extends Prisma.ConversationSelect>(id: string, selectType: T): Promise<Prisma.ConversationGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.conversation.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching Conversation data for id: ${id}`, error);
          return null;
     }
})