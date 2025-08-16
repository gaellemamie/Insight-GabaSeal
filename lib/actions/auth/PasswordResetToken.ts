"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createPasswordResetToken(data: Prisma.PasswordResetTokenCreateInput) {
     try {
          const res = await prisma.passwordResetToken.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating PasswordResetToken: ", error);
          return null;
     }
}

export async function updatePasswordResetToken(id: string, data: Prisma.PasswordResetTokenUpdateInput) {
     try {
          const res = await prisma.passwordResetToken.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating PasswordResetToken with id: ${id}`, error);
          return null;
     }
}

export async function deletePasswordResetToken(id: string) {
     try {
          const res = await prisma.passwordResetToken.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting PasswordResetToken with id: ", id, error);
          return null;
     }
}

export const fetchPasswordResetToken = cache(async <T extends Prisma.PasswordResetTokenSelect>(
     selectType: T, search?: Prisma.PasswordResetTokenWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.PasswordResetTokenOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.PasswordResetTokenGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.passwordResetToken.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.passwordResetToken.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching PasswordResetTokens: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchPasswordResetTokenById = cache(async <T extends Prisma.PasswordResetTokenSelect>(id: string, selectType: T): Promise<Prisma.PasswordResetTokenGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.passwordResetToken.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching PasswordResetToken data for id: ${id}`, error);
          return null;
     }
})