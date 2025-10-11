import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@abrigo.com";
  const adminPassword = "senha_123"; 
  const adminName = "Admin do Abrigo";

  console.log("Iniciando a criação do usuário admin...");

  // Verifica se o usuário já existe
  const existingAdmin = await prisma.adotante.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("Usuário admin com este e-mail já existe.");
    return;
  }

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Cria o usuário com o papel de ADMIN
  await prisma.adotante.create({
    data: {
      email: adminEmail,
      senha: hashedPassword,
      nome: adminName,
      role: 'ADMIN',
      telefone: "00000000000",
      rua: "Não Aplicável",
      bairro: "Não Aplicável",
      cidade: "Não Aplicável",
      uf: "NA",
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