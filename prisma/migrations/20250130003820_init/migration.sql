/*
  Warnings:

  - Added the required column `category_id` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo_url` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "photo_url" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
