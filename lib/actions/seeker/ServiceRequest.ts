"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createServiceRequest(data: Prisma.ServiceRequestCreateInput) {
     try {
          const res = await prisma.serviceRequest.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating ServiceRequest: ", error);
          return null;
     }
}

export async function updateServiceRequest(id: string, data: Prisma.ServiceRequestUpdateInput) {
     try {
          const res = await prisma.serviceRequest.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating ServiceRequest with id: ${id}`, error);
          return null;
     }
}

export async function deleteServiceRequest(id: string) {
     try {
          const res = await prisma.serviceRequest.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting ServiceRequest with id: ", id, error);
          return null;
     }
}

export const fetchServiceRequest = cache(async <T extends Prisma.ServiceRequestSelect>(
     selectType: T, search?: Prisma.ServiceRequestWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.ServiceRequestOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.ServiceRequestGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.serviceRequest.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.serviceRequest.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching ServiceRequests: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchServiceRequestById = cache(async <T extends Prisma.ServiceRequestSelect>(id: string, selectType: T): Promise<Prisma.ServiceRequestGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.serviceRequest.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching ServiceRequest data for id: ${id}`, error);
          return null;
     }
})