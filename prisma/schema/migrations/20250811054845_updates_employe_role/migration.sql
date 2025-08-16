/*
  Warnings:

  - You are about to drop the column `employeRoleId` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,institutionId]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeRoleId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,departmentId]` on the table `EmployeeRole` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `institution` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeeRoleId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signingMark` to the `EmployeeRole` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_employeRoleId_fkey";

-- DropIndex
DROP INDEX "Employee_employeRoleId_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "employeRoleId",
ADD COLUMN     "employeeRoleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeRole" ADD COLUMN     "signingMark" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_institutionId_key" ON "Department"("name", "institutionId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeRoleId_key" ON "Employee"("employeeRoleId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeRole_name_departmentId_key" ON "EmployeeRole"("name", "departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "institution_name_key" ON "institution"("name");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employeeRoleId_fkey" FOREIGN KEY ("employeeRoleId") REFERENCES "EmployeeRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
