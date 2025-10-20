import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@abrigo.com";
  const adminPassword = "senha_123"; 
  const adminName = "Admin do Abrigo";

  console.log("Iniciando a criação do usuário admin...");

  // 1. CORREÇÃO: Verifica se o admin já existe na tabela 'Auth'
  const existingAdmin = await prisma.auth.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("Usuário admin com este e-mail já existe.");
    return;
  }

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // 2. CORREÇÃO: Cria o registro 'Auth' e o 'Adotante' relacionado de uma só vez
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