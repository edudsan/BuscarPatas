-- CreateEnum
CREATE TYPE "StatusPet" AS ENUM ('DISPONIVEL', 'ADOTADO');

-- CreateEnum
CREATE TYPE "TamanhoPet" AS ENUM ('PEQUENO', 'MEDIO', 'GRANDE');

-- CreateEnum
CREATE TYPE "PersonalidadePet" AS ENUM ('CALMO', 'BRINCALHAO', 'INDEPENDENTE');

-- CreateTable
CREATE TABLE "Pet" (
    "pet_id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "data_nascimento" DATE,
    "descricao" TEXT,
    "status" "StatusPet" NOT NULL DEFAULT 'DISPONIVEL',
    "tamanho" "TamanhoPet",
    "personalidade" "PersonalidadePet",

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("pet_id")
);

-- CreateTable
CREATE TABLE "Adotante" (
    "adotante_id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" VARCHAR(2) NOT NULL,

    CONSTRAINT "Adotante_pkey" PRIMARY KEY ("adotante_id")
);

-- CreateTable
CREATE TABLE "Adocao" (
    "adocao_id" SERIAL NOT NULL,
    "data_adocao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pet_id" INTEGER NOT NULL,
    "adotante_id" INTEGER NOT NULL,

    CONSTRAINT "Adocao_pkey" PRIMARY KEY ("adocao_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adotante_email_key" ON "Adotante"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Adocao_pet_id_key" ON "Adocao"("pet_id");

-- AddForeignKey
ALTER TABLE "Adocao" ADD CONSTRAINT "Adocao_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("pet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adocao" ADD CONSTRAINT "Adocao_adotante_id_fkey" FOREIGN KEY ("adotante_id") REFERENCES "Adotante"("adotante_id") ON DELETE RESTRICT ON UPDATE CASCADE;
