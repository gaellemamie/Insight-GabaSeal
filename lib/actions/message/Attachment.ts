"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createAttachment(data: Prisma.AttachmentCreateInput) {
     try {
          const res = await prisma.attachment.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating Attachment: ", error);
          return null;
     }
}

export async function updateAttachment(id: string, data: Prisma.AttachmentUpdateInput) {
     try {
          const res = await prisma.attachment.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating Attachment with id: ${id}`, error);
          return null;
     }
}

export async function deleteAttachment(id: string) {
     try {
          const res = await prisma.attachment.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting Attachment with id: ", id, error);
          return null;
     }
}

export const fetchAttachment = cache(async <T extends Prisma.AttachmentSelect>(
     selectType: T, search?: Prisma.AttachmentWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.AttachmentOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.AttachmentGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.attachment.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.attachment.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching Attachments: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchAttachmentById = cache(async <T extends Prisma.AttachmentSelect>(id: string, selectType: T): Promise<Prisma.AttachmentGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.attachment.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching Attachment data for id: ${id}`, error);
          return null;
     }
})