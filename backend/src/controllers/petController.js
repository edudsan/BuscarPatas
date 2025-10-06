import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE
export const createPet = async (req, res) => {
  try {
    const { nome, especie, data_nascimento, descricao, status, tamanho, personalidade } = req.body;

    const dadosCriacao = {
      nome,
      especie,
      data_nascimento: data_nascimento ? new Date(data_nascimento) : null,
      descricao,
    };

    if (status) dadosCriacao.status = status.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (tamanho) dadosCriacao.tamanho = tamanho.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (personalidade) dadosCriacao.personalidade = personalidade.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const novoPet = await prisma.pet.create({
      data: dadosCriacao,
    });

    res.status(201).json(novoPet);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível cadastrar o pet.' });
  }
};

// READ
export const getAllAvailablePets = async (req, res) => {
  try {
    const petsDisponiveis = await prisma.pet.findMany({
      where: {
        status: 'DISPONIVEL',
      },
    });
    res.status(200).json(petsDisponiveis);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível listar os pets.' });
  }
};

// READ (Listar todos os pets com filtro avançado)
export const getAllPets = async (req, res) => {
  try {
    // Pega os possíveis filtros da query da URL (ex: /pets?especie=Gato&tamanho=PEQUENO)
    const { especie, status, tamanho, personalidade } = req.query;

    // Objeto que vai guardar as condições do filtro
    const where = {};

    if (especie) {
      where.especie = especie;
    }
    if (status) {
      where.status = status;
    }
    if (tamanho) {
      where.tamanho = tamanho;
    }
    if (personalidade) {
      where.personalidade = personalidade;
    }

    // Busca os pets no banco de dados aplicando os filtros construídos
    const pets = await prisma.pet.findMany({
      where: where,
    });
    
    res.status(200).json(pets);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Não foi possível listar os pets.' });
  }
};

// READ (Listar pets adotados)
export const getAllAdoptedPets = async (req, res) => {
  try {
    const petsAdotados = await prisma.pet.findMany({
      where: {
        status: 'ADOTADO',
      },
    });
    res.status(200).json(petsAdotados);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível listar os pets adotados.' });
  }
};

// UPDATE
export const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, especie, data_nascimento, descricao, status, tamanho, personalidade } = req.body;

    // Objeto que guardará apenas os dados que foram enviados na requisição
    const dadosParaAtualizar = {};

    if (nome) dadosParaAtualizar.nome = nome;
    if (especie) dadosParaAtualizar.especie = especie;
    if (data_nascimento) dadosParaAtualizar.data_nascimento = new Date(data_nascimento);
    if (descricao) dadosParaAtualizar.descricao = descricao;
    if (status) {
      const statusTratado = status.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (statusTratado === 'DISPONIVEL' || statusTratado === 'ADOTADO') {
        dadosParaAtualizar.status = statusTratado;
      } else {
        return res.status(400).json({ error: 'O status deve ser DISPONIVEL ou ADOTADO.' });
      }
    }
    if (tamanho) dadosParaAtualizar.tamanho = tamanho.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (personalidade) dadosParaAtualizar.personalidade = personalidade.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const petAtualizado = await prisma.pet.update({
      where: { pet_id: parseInt(id) }, 
      data: dadosParaAtualizar, 
    });

    res.status(200).json(petAtualizado);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Não foi possível atualizar o pet.' });
  }
};

// DELETE
export const deletePet = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o pet está associado a alguma adoção
    const adocaoExistente = await prisma.adocao.findFirst({
      where: {
        pet_id: parseInt(id),
      },
    });

    // Se uma adoção for encontrada, retorna um erro e impede a exclusão
    if (adocaoExistente) {
      return res.status(409).json({
        error: 'Este pet não pode ser excluído pois já possui um registro de adoção.',
      });
    }
    // Se não houver adoção, prossegue com a exclusão
    await prisma.pet.delete({
      where: { pet_id: parseInt(id) }, 
    });

    res.status(204).send();
  } catch (error) {
    // Trata o caso em que o pet com o ID fornecido não é encontrado
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Pet não encontrado.' });
    }
    res.status(500).json({ error: 'Não foi possível remover o pet.' });
  }
};
