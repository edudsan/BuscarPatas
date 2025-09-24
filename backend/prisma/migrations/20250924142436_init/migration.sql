-- CreateEnum
CREATE TYPE "StatusPet" AS ENUM ('DISPONIVEL', 'ADOTADO');

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "data_nascimento" DATE,
    "descricao" TEXT,
    "status" "StatusPet" NOT NULL DEFAULT 'DISPONIVEL',

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adotante" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,

    CONSTRAINT "Adotante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adocao" (
    "id" SERIAL NOT NULL,
    "data_adocao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pet_id" INTEGER NOT NULL,
    "adotante_id" INTEGER NOT NULL,

    CONSTRAINT "Adocao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adotante_email_key" ON "Adotante"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Adocao_pet_id_key" ON "Adocao"("pet_id");

-- AddForeignKey
ALTER TABLE "Adocao" ADD CONSTRAINT "Adocao_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adocao" ADD CONSTRAINT "Adocao_adotante_id_fkey" FOREIGN KEY ("adotante_id") REFERENCES "Adotante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
