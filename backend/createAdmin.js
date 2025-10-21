import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "buscarpatas@gmail.com";
  const adminPassword = "senha_123"; 
  const adminName = "Admin do Abrigo";

  console.log("Iniciando a criação do usuário admin...");

  const existingAdmin = await prisma.auth.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("Usuário admin com este e-mail já existe.");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.auth.create({
    data: {
      email: adminEmail,
      senha: hashedPassword,
      role: 'ADMIN',
      adotante: { // Cria o perfil do adotante aninhado
        create: {
          nome: adminName,
          telefone: "00000000000",
          rua: "Não Aplicável",
          bairro: "Não Aplicável",
          cidade: "Não Aplicável",
          uf: "NA",
        }
      }
    },
  });

  console.log("Usuário admin criado com sucesso!");
  console.log(`E-mail: ${adminEmail}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });