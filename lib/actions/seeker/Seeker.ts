"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createSeeker(data: Prisma.SeekerCreateInput) {
     try {
          const res = await prisma.seeker.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating Seeker: ", error);
          return null;
     }
}

export async function updateSeeker(id: string, data: Prisma.SeekerUpdateInput) {
     try {
          const res = await prisma.seeker.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating Seeker with id: ${id}`, error);
          return null;
     }
}

export async function deleteSeeker(id: string) {
     try {
          const res = await prisma.seeker.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting Seeker with id: ", id, error);
          return null;
     }
}

export const fetchSeeker = cache(async <T extends Prisma.SeekerSelect>(
     selectType: T, search?: Prisma.SeekerWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.SeekerOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.SeekerGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.seeker.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.seeker.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching Seekers: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchSeekerById = cache(async <T extends Prisma.SeekerSelect>(id: string, selectType: T): Promise<Prisma.SeekerGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.seeker.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching Seeker data for id: ${id}`, error);
          return null;
     }
})