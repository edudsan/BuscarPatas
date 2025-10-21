-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."StatusPet" AS ENUM ('DISPONIVEL', 'ADOTADO');

-- CreateEnum
CREATE TYPE "public"."TamanhoPet" AS ENUM ('PEQUENO', 'MEDIO', 'GRANDE');

-- CreateEnum
CREATE TYPE "public"."PersonalidadePet" AS ENUM ('CALMO', 'BRINCALHAO', 'INDEPENDENTE');

-- CreateTable
CREATE TABLE "public"."Auth" (
    "auth_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("auth_id")
);

-- CreateTable
CREATE TABLE "public"."Adotante" (
    "adotante_id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "rua" TEXT,
    "numero" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "uf" VARCHAR(2),
    "auth_id" INTEGER NOT NULL,

    CONSTRAINT "Adotante_pkey" PRIMARY KEY ("adotante_id")
);

-- CreateTable
CREATE TABLE "public"."Pet" (
    "pet_id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "data_nascimento" DATE,
    "descricao" TEXT,
    "status" "public"."StatusPet" NOT NULL DEFAULT 'DISPONIVEL',
    "tamanho" "public"."TamanhoPet",
    "personalidade" "public"."PersonalidadePet",
    "imagem_url1" TEXT,
    "imagem_url2" TEXT,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("pet_id")
);

-- CreateTable
CREATE TABLE "public"."Adocao" (
    "adocao_id" SERIAL NOT NULL,
    "data_adocao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pet_id" INTEGER NOT NULL,
    "adotante_id" INTEGER NOT NULL,

    CONSTRAINT "Adocao_pkey" PRIMARY KEY ("adocao_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "public"."Auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Adotante_auth_id_key" ON "public"."Adotante"("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "Adocao_pet_id_key" ON "public"."Adocao"("pet_id");

-- AddForeignKey
ALTER TABLE "public"."Adotante" ADD CONSTRAINT "Adotante_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "public"."Auth"("auth_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Adocao" ADD CONSTRAINT "Adocao_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "public"."Pet"("pet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Adocao" ADD CONSTRAINT "Adocao_adotante_id_fkey" FOREIGN KEY ("adotante_id") REFERENCES "public"."Adotante"("adotante_id") ON DELETE RESTRICT ON UPDATE CASCADE;
