"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";
import { encryptPassword } from "@/utils/bcryptFuncs";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { SAuthUser, TAuthUser } from "@/lib/select-types/auth/user";

export async function createUser(data: Prisma.UserCreateInput) {
     try {
          const hash = await encryptPassword(data.password);
          data.password = hash;
          const res = await prisma.user.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating User: ", error);
          return null;
     }
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
     try {
          const password = String(data.password);
          if (data.password && password.trim().length > 0) {
               const hash = await encryptPassword(password);
               data.password = hash;
          }
          const res = await prisma.user.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating User with id: ${id}`, error);
          return null;
     }
}

export async function deleteUser(id: string) {
     try {
          const res = await prisma.user.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting User with id: ", id, error);
          return null;
     }
}

export const fetchUser = cache(async <T extends Prisma.UserSelect>(
     selectType: T, search?: Prisma.UserWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.UserOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.UserGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.user.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.user.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching Users: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchUserById = cache(async <T extends Prisma.UserSelect>(id: string, selectType: T): Promise<Prisma.UserGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.user.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching User data for id: ${id}`, error);
          return null;
     }
});

export async function getSessionUser ():Promise<{user:TAuthUser | null | undefined, session: Session | null}>{
     const session = await getServerSession(authOptions);
     if(!session) return {user:null, session: null};
     const sessionUser = session.user;
     if(!sessionUser) return {user:null, session};
     if (!sessionUser.email) return {user:null, session: session};
     const user = await prisma.user.findUnique({where: {email: sessionUser.email}, select: SAuthUser});

     return {user, session};
}