import { Prisma } from "@/prisma/lib/generated/prisma";

export const SSimpleUser = {
     id:true,email:true
} satisfies Prisma.UserSelect;

export type TSimpleUser = Prisma.UserGetPayload<{select: typeof SSimpleUser}>;

export const SAuthUser = {
     id:true,email:true, type:true, password:true, image:true,status:true,certificateUrl:true, signImageUrl:true
} satisfies Prisma.UserSelect;

export type TAuthUser = Prisma.UserGetPayload<{select: typeof SAuthUser}>;

export const SUserUpdate = {
     id:true,email:true, image:true, certificateUrl:true, signImageUrl:true,
} satisfies Prisma.UserSelect;

export type TUserUpdate = Prisma.UserGetPayload<{select: typeof SUserUpdate}>