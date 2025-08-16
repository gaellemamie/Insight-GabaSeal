/*
  Warnings:

  - Added the required column `institutions` to the `Seeker` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EServiceType" AS ENUM ('PRIVATE', 'PUBLIC');

-- CreateEnum
CREATE TYPE "EServiceRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Seeker" ADD COLUMN     "institutions" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "signImageUrl" TEXT;

-- AlterTable
ALTER TABLE "institution" ADD COLUMN     "serviceType" "EServiceType" NOT NULL DEFAULT 'PRIVATE';

-- CreateTable
CREATE TABLE "ServiceRequest" (
    "id" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,
    "status" "EServiceRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "seekerId" TEXT NOT NULL,

    CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_seekerId_fkey" FOREIGN KEY ("seekerId") REFERENCES "Seeker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
