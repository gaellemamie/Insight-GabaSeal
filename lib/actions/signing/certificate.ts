"use server";


import prisma from "@/lib/prisma";
import { Prisma } from "@/prisma/lib/generated/prisma";
import { cache } from "react";
import revalidateApp from "../revalidate";

export async function createCertificate(data: Prisma.CertificateCreateInput) {
     try {
          const res = await prisma.certificate.create({ data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("error creating Certificate: ", error);
          return null;
     }
}

export async function updateCertificate(id: string, data: Prisma.CertificateUpdateInput) {
     try {
          const res = await prisma.certificate.update({ where: { id }, data });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log(`Error updating Certificate with id: ${id}`, error);
          return null;
     }
}

export async function deleteCertificate(id: string) {
     try {
          const res = await prisma.certificate.delete({ where: { id } });
          if (res) revalidateApp();
          return res;
     } catch (error) {
          console.log("Error deleting Certificate with id: ", id, error);
          return null;
     }
}

export const fetchCertificate = cache(async <T extends Prisma.CertificateSelect>(
     selectType: T, search?: Prisma.CertificateWhereInput, take: number = 20, skip: number = 0,
     orderBy: Prisma.CertificateOrderByWithRelationInput = { createdAt: 'desc' }
): Promise<{ data: Prisma.CertificateGetPayload<{ select: T }>[], pagination: { total: number } }> => {
     try {
          const res = await prisma.certificate.findMany({ where: search, take, skip, select: selectType, orderBy });
          const total = await prisma.certificate.count({ where: search });
          return { data: res, pagination: { total } };
     } catch (error) {
          console.log("Error fetching Certificates: ", error);
          return { data: [], pagination: { total: 0 } }
     }
});

export const fetchCertificateById = cache(async <T extends Prisma.CertificateSelect>(id: string, selectType: T): Promise<Prisma.CertificateGetPayload<{ select: T }> | null> => {
     try {
          const res = await prisma.certificate.findUnique({ where: { id }, select: selectType });
          return res;
     } catch (error) {
          console.log(`Error fetching Certificate data for id: ${id}`, error);
          return null;
     }
})