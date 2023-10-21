/*
  Warnings:

  - You are about to drop the column `productslist` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productslist",
ADD COLUMN     "cartlist" INTEGER[];
