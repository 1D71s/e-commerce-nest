/*
  Warnings:

  - You are about to alter the column `totalCost` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "totalCost" SET DATA TYPE INTEGER;
