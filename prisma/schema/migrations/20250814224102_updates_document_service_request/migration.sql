/*
  Warnings:

  - A unique constraint covering the columns `[seekerId,institutionId]` on the table `ServiceRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ECertificationStatus" AS ENUM ('UNCERTIFIED', 'CERTIFIED');

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "certificationStatus" "ECertificationStatus" NOT NULL DEFAULT 'UNCERTIFIED',
ADD COLUMN     "groupName" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "ServiceRequest_seekerId_institutionId_key" ON "ServiceRequest"("seekerId", "institutionId");
