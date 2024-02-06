/*
  Warnings:

  - You are about to drop the column `actividadId` on the `Gastos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gastos" DROP CONSTRAINT "Gastos_actividadId_fkey";

-- AlterTable
ALTER TABLE "Gastos" DROP COLUMN "actividadId";
