import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o processo de seeding...');

  // Limpa as tabelas existentes para evitar duplicatas
  await prisma.adocao.deleteMany({});
  await prisma.pet.deleteMany({});
  await prisma.adotante.deleteMany({});
  console.log('Tabelas limpas.');

  // Criptografa uma senha padrão para todos os adotantes
  const senhaPadrao = await bcrypt.hash('senha123', 10);

  // Cria os Adotantes
  const adotantes = await prisma.adotante.createMany({
    data: [
      { nome: "Mariana Costa", email: "mariana.costa@example.com", senha: senhaPadrao, telefone: "11988776655", rua: "Avenida Paulista", numero: "2000", bairro: "Bela Vista", cidade: "São Paulo", uf: "SP" },
      { nome: "Ricardo Almeida", email: "ricardo.a@example.com", senha: senhaPadrao, telefone: "71911223344", rua: "Rua das Laranjeiras", numero: "50", bairro: "Pelourinho", cidade: "Salvador", uf: "BA" },
      { nome: "Fernanda Oliveira", email: "fernanda.oliveira@example.com", senha: senhaPadrao, telefone: "48999887766", rua: "Avenida Beira Mar Norte", numero: "1200", bairro: "Centro", cidade: "Florianópolis", uf: "SC" },
      { nome: "Lucas Pereira", email: "lucas.pereira@example.com", senha: senhaPadrao, telefone: "61981234567", rua: "SQS 308 Bloco C", numero: "101", bairro: "Asa Sul", cidade: "Brasília", uf: "DF" },
      { nome: "Juliana Santos", email: "juliana.s@example.com", senha: senhaPadrao, telefone: "92992345678", rua: "Rua Tapajós", numero: "45", bairro: "Centro", cidade: "Manaus", uf: "AM" }
    ]
  });
  console.log(`${adotantes.count} adotantes criados.`);

  // Cria os Pets
  const pets = await prisma.pet.createMany({
    data: [
      { nome: "Fred", especie: "Cachorro", data_nascimento: new Date("2023-08-10"), descricao: "Vira-lata caramelo muito esperto e carinhoso. Adora crianças.", tamanho: "MEDIO", personalidade: "BRINCALHAO" },
      { nome: "Luna", especie: "Gato", data_nascimento: new Date("2022-04-01"), descricao: "Gata siamesa muito tranquila e um pouco tímida no começo. Gosta de ambientes calmos.", tamanho: "PEQUENO", personalidade: "CALMO" },
      { nome: "Zeca", especie: "Papagaio", data_nascimento: new Date("2020-01-20"), descricao: "Papagaio muito falante e sociável. Gosta de cantar pela manhã.", tamanho: "PEQUENO", personalidade: "BRINCALHAO" },
      { nome: "Amora", especie: "Cachorro", data_nascimento: new Date("2019-12-25"), descricao: "Uma cadela de porte grande, mistura de labrador. Muito obediente e já adestrada.", tamanho: "GRANDE", personalidade: "CALMO" },
      { nome: "Nino", especie: "Gato", data_nascimento: new Date("2024-05-15"), descricao: "Filhote de gato preto muito curioso e independente. Adora explorar a casa.", tamanho: "PEQUENO", personalidade: "INDEPENDENTE" }
    ]
  });
  console.log(`${pets.count} pets criados.`);

  // Realiza as Adoções (usando os IDs que sabemos que serão gerados: 1, 2, 3...)
  await prisma.$transaction(async (prisma) => {
    // Adoção 1: Mariana Costa (id 1) adota Fred (id 1)
    await prisma.adocao.create({ data: { adotante_id: 1, pet_id: 1 } });
    await prisma.pet.update({ where: { pet_id: 1 }, data: { status: 'ADOTADO' } });
    console.log('Adoção 1 realizada.');

    // Adoção 2: Lucas Pereira (id 4) adota Luna (id 2)
    await prisma.adocao.create({ data: { adotante_id: 4, pet_id: 2 } });
    await prisma.pet.update({ where: { pet_id: 2 }, data: { status: 'ADOTADO' } });
    console.log('Adoção 2 realizada.');
  });

  console.log('Seeding finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });