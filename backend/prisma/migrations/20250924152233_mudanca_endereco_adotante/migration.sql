/*
  Warnings:

  - You are about to drop the column `endereco` on the `Adotante` table. All the data in the column will be lost.
  - Added the required column `bairro` to the `Adotante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Adotante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `Adotante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `Adotante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Adotante" DROP COLUMN "endereco",
ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "numero" TEXT,
ADD COLUMN     "rua" TEXT NOT NULL,
ADD COLUMN     "uf" VARCHAR(2) NOT NULL;
