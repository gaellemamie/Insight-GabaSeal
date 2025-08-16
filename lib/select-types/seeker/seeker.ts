import { Prisma } from "@/prisma/lib/generated/prisma";


export const SSimpleSeeker = {
     id:true,
} satisfies Prisma.SeekerSelect;

export type TSimpleSeeker = Prisma.SeekerGetPayload<{select: typeof SSimpleSeeker}>;


export const SAuthSeeker = {
     id:true, name:true, email:true, phone:true, location:true, dob:true, gender:true, institutions:true, 
     requests:{select:{institutionId:true, createdAt:true,status:true}}, userId:true
} satisfies Prisma.SeekerSelect;

export type TAuthSeeker = Prisma.SeekerGetPayload<{select: typeof SAuthSeeker}>;

export const SSeekerUpdate = {
     id:true, name:true, email:true, dob:true, location:true, nationalId: true, phone:true, gender:true, 
} satisfies Prisma.SeekerSelect;

export type TSeekerUpdate = Prisma.SeekerGetPayload<{select: typeof SSeekerUpdate}>;