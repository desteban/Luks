/*
  Warnings:

  - You are about to alter the column `nombre` on the `TiposGastos` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE "TiposGastos" ADD COLUMN     "descrip" TEXT,
ALTER COLUMN "nombre" SET DATA TYPE VARCHAR(30);
