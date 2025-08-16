"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createAdmin(data: Prisma.AdminCreateInput) {
     try {
          const res = await prisma.admin.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating Admin: ", error);
          return null;
     }
}

export async function updateAdmin(id: string, data: Prisma.AdminUpdateInput) {
     try {
          const res = await prisma.admin.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating Admin with id: ${id}`, error);
          return null;
     }
}

export async function deleteAdmin(id: string) {
     try {
          const res = await prisma.admin.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting Admin with id: ", id, error);
          return null;
     }
}

export const fetchAdmin = cache(async <T extends Prisma.AdminSelect>(
     selectType: T, search?: Prisma.AdminWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.AdminOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.AdminGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.admin.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.admin.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching Admins: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchAdminById = cache(async <T extends Prisma.AdminSelect>(id: string, selectType: T): Promise<Prisma.AdminGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.admin.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching Admin data for id: ${id}`, error);
          return null;
     }
})