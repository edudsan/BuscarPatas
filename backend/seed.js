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
  await prisma.adotante.createMany({
    data: [
      { nome: "Mariana Costa", email: "mariana.costa@example.com", senha: senhaPadrao, telefone: "11988776655", rua: "Avenida Paulista", numero: "2000", bairro: "Bela Vista", cidade: "São Paulo", uf: "SP" },
      { nome: "Ricardo Almeida", email: "ricardo.a@example.com", senha: senhaPadrao, telefone: "71911223344", rua: "Rua das Laranjeiras", numero: "50", bairro: "Pelourinho", cidade: "Salvador", uf: "BA" },
      { nome: "Fernanda Oliveira", email: "fernanda.oliveira@example.com", senha: senhaPadrao, telefone: "48999887766", rua: "Avenida Beira Mar Norte", numero: "1200", bairro: "Centro", cidade: "Florianópolis", uf: "SC" },
      { nome: "Lucas Pereira", email: "lucas.pereira@example.com", senha: senhaPadrao, telefone: "61981234567", rua: "SQS 308 Bloco C", numero: "101", bairro: "Asa Sul", cidade: "Brasília", uf: "DF" },
      { nome: "Juliana Santos", email: "juliana.s@example.com", senha: senhaPadrao, telefone: "92992345678", rua: "Rua Tapajós", numero: "45", bairro: "Centro", cidade: "Manaus", uf: "AM" }
    ]
  });
  console.log('Adotantes criados.');

  // Dados para 50 Pets
  const petData = [
    { nome: "Fred", especie: "Cachorro", data_nascimento: new Date("2023-08-10"), descricao: "Vira-lata caramelo muito esperto e carinhoso. Adora crianças.", tamanho: "MEDIO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Luna", especie: "Gato", data_nascimento: new Date("2022-04-01"), descricao: "Gata siamesa muito tranquila e um pouco tímida no começo.", tamanho: "PEQUENO", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Zeca", especie: "Pássaro", data_nascimento: new Date("2020-01-20"), descricao: "Papagaio muito falante e sociável. Gosta de cantar.", tamanho: "PEQUENO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Amora", especie: "Cachorro", data_nascimento: new Date("2019-12-25"), descricao: "Uma cadela de porte grande, mistura de labrador. Muito obediente.", tamanho: "GRANDE", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Nino", especie: "Gato", data_nascimento: new Date("2024-05-15"), descricao: "Filhote de gato preto muito curioso e independente.", tamanho: "PEQUENO", personalidade: "INDEPENDENTE", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Toby", especie: "Cachorro", data_nascimento: new Date("2022-02-14"), descricao: "Um beagle animado que adora farejar tudo.", tamanho: "MEDIO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Mia", especie: "Gato", data_nascimento: new Date("2021-09-30"), descricao: "Gata de pelo curto, muito afetuosa e gosta de colo.", tamanho: "PEQUENO", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Rocky", especie: "Cachorro", data_nascimento: new Date("2020-07-22"), descricao: "Pastor alemão leal e protetor, ótimo cão de guarda.", tamanho: "GRANDE", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Simba", especie: "Gato", data_nascimento: new Date("2023-01-05"), descricao: "Gato laranja que adora brincar com bolinhas de papel.", tamanho: "PEQUENO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Lola", especie: "Cachorro", data_nascimento: new Date("2023-11-11"), descricao: "Poodle miniatura, muito inteligente e fácil de treinar.", tamanho: "PEQUENO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Oliver", especie: "Gato", data_nascimento: new Date("2018-06-18"), descricao: "Gato experiente e tranquilo, perfeito para um apartamento.", tamanho: "MEDIO", personalidade: "INDEPENDENTE", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Max", especie: "Cachorro", data_nascimento: new Date("2021-03-25"), descricao: "Golden retriever amigável com todos.", tamanho: "GRANDE", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Bella", especie: "Cachorro", data_nascimento: new Date("2024-02-01"), descricao: "Filhote de shih-tzu, adora dormir no colo.", tamanho: "PEQUENO", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Charlie", especie: "Cachorro", data_nascimento: new Date("2019-08-19"), descricao: "Buldogue francês teimoso mas muito carinhoso.", tamanho: "PEQUENO", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Lucy", especie: "Cachorro", data_nascimento: new Date("2022-10-09"), descricao: "Vira-lata de porte médio, muito ativa e companheira.", tamanho: "MEDIO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Leo", especie: "Gato", data_nascimento: new Date("2023-05-20"), descricao: "Gato de pelo longo que precisa de escovação regular.", tamanho: "MEDIO", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Daisy", especie: "Cachorro", data_nascimento: new Date("2023-04-12"), descricao: "Uma basset hound charmosa com orelhas enormes.", tamanho: "MEDIO", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Milo", especie: "Gato", data_nascimento: new Date("2022-12-01"), descricao: "Gato cinza muito independente, mas gosta de um carinho.", tamanho: "PEQUENO", personalidade: "INDEPENDENTE", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Zoe", especie: "Cachorro", data_nascimento: new Date("2020-11-03"), descricao: "Dálmata cheia de energia, precisa de muito exercício.", tamanho: "GRANDE", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Jack", especie: "Cachorro", data_nascimento: new Date("2024-01-10"), descricao: "Filhote de terrier, pequeno e valente.", tamanho: "PEQUENO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Cleo", especie: "Gato", data_nascimento: new Date("2017-02-15"), descricao: "Gata idosa e serena, procurando um lar tranquilo para relaxar.", tamanho: "MEDIO", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Duke", especie: "Cachorro", data_nascimento: new Date("2021-06-28"), descricao: "Husky siberiano com lindos olhos azuis.", tamanho: "GRANDE", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Lily", especie: "Gato", data_nascimento: new Date("2023-09-05"), descricao: "Gatinha branca e preta, muito brincalhona.", tamanho: "PEQUENO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Cooper", especie: "Cachorro", data_nascimento: new Date("2022-08-11"), descricao: "Um cão de porte médio que se dá bem com outros cães.", tamanho: "MEDIO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Nala", especie: "Gato", data_nascimento: new Date("2020-03-17"), descricao: "Gata elegante e observadora, gosta de janelas.", tamanho: "MEDIO", personalidade: "INDEPENDENTE", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Bear", especie: "Cachorro", data_nascimento: new Date("2018-10-20"), descricao: "Um grande e gentil São Bernardo, um gigante amável.", tamanho: "GRANDE", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Chloe", especie: "Gato", data_nascimento: new Date("2022-05-19"), descricao: "Gatinha muito curiosa e aventureira.", tamanho: "PEQUENO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Riley", especie: "Cachorro", data_nascimento: new Date("2023-03-03"), descricao: "Border collie extremamente inteligente e ágil.", tamanho: "MEDIO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Gizmo", especie: "Coelho", data_nascimento: new Date("2024-04-01"), descricao: "Coelho pequeno e fofo, adora cenouras.", tamanho: "PEQUENO", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Ruby", especie: "Cachorro", data_nascimento: new Date("2019-05-25"), descricao: "Setter irlandês com uma pelagem ruiva deslumbrante.", tamanho: "GRANDE", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Oscar", especie: "Gato", data_nascimento: new Date("2021-11-29"), descricao: "Gato malhado que adora um bom esconderijo.", tamanho: "MEDIO", personalidade: "INDEPENDENTE", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Bentley", especie: "Cachorro", data_nascimento: new Date("2023-07-14"), descricao: "Pug simpático e um pouco preguiçoso.", tamanho: "PEQUENO", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Penny", especie: "Cachorro", data_nascimento: new Date("2022-04-08"), descricao: "Vira-lata de porte médio, muito leal à sua família.", tamanho: "MEDIO", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Thor", especie: "Cachorro", data_nascimento: new Date("2020-01-01"), descricao: "Um rottweiler imponente, mas muito dócil com conhecidos.", tamanho: "GRANDE", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Misty", especie: "Gato", data_nascimento: new Date("2023-10-10"), descricao: "Gata de pelo azul russo, um pouco tímida.", tamanho: "PEQUENO", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Cody", especie: "Cachorro", data_nascimento: new Date("2021-08-21"), descricao: "Um cão de água português, adora nadar.", tamanho: "MEDIO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Sasha", especie: "Cachorro", data_nascimento: new Date("2018-03-12"), descricao: "Uma akita majestosa e independente.", tamanho: "GRANDE", personalidade: "INDEPENDENTE", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Pipoca", especie: "Hamster", data_nascimento: new Date("2024-06-01"), descricao: "Hamster anão russo, muito ativo durante a noite.", tamanho: "PEQUENO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Winston", especie: "Cachorro", data_nascimento: new Date("2022-09-18"), descricao: "Buldogue inglês que adora cochilos e ar condicionado.", tamanho: "MEDIO", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Stella", especie: "Cachorro", data_nascimento: new Date("2023-06-07"), descricao: "Galgo italiano, elegante e veloz.", tamanho: "MEDIO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Zeus", especie: "Cachorro", data_nascimento: new Date("2019-11-15"), descricao: "Dogue alemão gigante e gentil.", tamanho: "GRANDE", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Phoebe", especie: "Gato", data_nascimento: new Date("2021-02-22"), descricao: "Gata excêntrica que adora 'conversar'.", tamanho: "PEQUENO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Apollo", especie: "Cachorro", data_nascimento: new Date("2023-08-01"), descricao: "Filhote de doberman, muito esperto e protetor.", tamanho: "MEDIO", personalidade: "BRINCALHAO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Biscoito", especie: "Cachorro", data_nascimento: new Date("2024-03-20"), descricao: "Filhote vira-lata de porte pequeno, super dócil.", tamanho: "PEQUENO", personalidade: "CALMO", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Fiona", especie: "Gato", data_nascimento: new Date("2019-04-05"), descricao: "Gata branca muito independente e caçadora de insetos.", tamanho: "MEDIO", personalidade: "INDEPENDENTE", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Laika", especie: "Cachorro", data_nascimento: new Date("2020-04-05"), descricao: "Cachorro mucho loko", tamanho: "MEDIO", personalidade: "INDEPENDENTE", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Nina", especie: "Gato", data_nascimento: new Date("2021-04-05"), descricao: "Gata branca muito independente e caçadora de insetos.", tamanho: "PEQUENO", personalidade: "INDEPENDENTE", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Pipoca", especie: "Gato", data_nascimento: new Date("2022-04-05"), descricao: "Gata branca muito independente e caçadora de insetos.", tamanho: "GRANDE", personalidade: "INDEPENDENTE", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Jumper", especie: "Gato", data_nascimento: new Date("2023-04-05"), descricao: "Gata branca muito independente e caçadora de insetos.", tamanho: "PEQUENO", personalidade: "INDEPENDENTE", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
    { nome: "Kurama", especie: "Gato", data_nascimento: new Date("2015-04-05"), descricao: "Gata marrom que aterroriza Konoha.", tamanho: "MEDIO", personalidade: "INDEPENDENTE", imagem_url1: "https://img.freepik.com/fotos-premium/o-cachorro-branco-dorme-na-mesa-em-frente-ao-laptop-o-conceito-de-trabalhar-em-casa-treinando-um-trabalhador-cansado_330478-1569.jpg?w=740" },
  ];

  await prisma.pet.createMany({
    data: petData,
  });
  console.log(`${petData.length} pets criados.`);

  // Realiza as Adoções
  const mariana = await prisma.adotante.findUnique({ where: { email: "mariana.costa@example.com" } });
  const lucas = await prisma.adotante.findUnique({ where: { email: "lucas.pereira@example.com" } });
  
  const fred = await prisma.pet.findFirst({ where: { nome: "Fred" } });
  const luna = await prisma.pet.findFirst({ where: { nome: "Luna" } });

  if (mariana && fred) {
    await prisma.adocao.create({ data: { adotante_id: mariana.adotante_id, pet_id: fred.pet_id } });
    await prisma.pet.update({ where: { pet_id: fred.pet_id }, data: { status: 'ADOTADO' } });
    console.log('Adoção 1 (Mariana e Fred) realizada.');
  }
  
  if (lucas && luna) {
    await prisma.adocao.create({ data: { adotante_id: lucas.adotante_id, pet_id: luna.pet_id } });
    await prisma.pet.update({ where: { pet_id: luna.pet_id }, data: { status: 'ADOTADO' } });
    console.log('Adoção 2 (Lucas e Luna) realizada.');
  }

  console.log('Seeding finalizado com sucesso! 🐾');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });