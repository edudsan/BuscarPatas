/*
  Warnings:

  - Added the required column `senha` to the `Adotante` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."Adotante" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "senha" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Pet" ADD COLUMN     "imagem_url1" TEXT,
ADD COLUMN     "imagem_url2" TEXT;
