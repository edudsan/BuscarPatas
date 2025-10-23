import { PrismaClient } from '@prisma/client';

// 1. Declara uma variável global para a instância do Prisma para ser utilizada em todo o ambiente Node.js.

let prisma;

if (process.env.NODE_ENV === 'production') {
  // Em produção, cria uma nova instância
  prisma = new PrismaClient();
} else {
  // Em desenvolvimento, verifica se a instância já existe na global
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// 2. Exporta a instância única
export { prisma };