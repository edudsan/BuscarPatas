import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE
export const createPet = async (req, res) => {
  try {
    const { nome, especie, data_nascimento, descricao } = req.body;
    const novoPet = await prisma.pet.create({
      data: {
        nome,
        especie,
        data_nascimento: new Date(data_nascimento),
        descricao,
      },
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

export const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, especie, data_nascimento, descricao, status } = req.body;

    // Objeto que guardará apenas os dados que foram enviados na requisição
    const dadosParaAtualizar = {};

    if (nome) {
      dadosParaAtualizar.nome = nome;
    }
    if (especie) {
      dadosParaAtualizar.especie = especie;
    }
    if (data_nascimento) {
      dadosParaAtualizar.data_nascimento = new Date(data_nascimento);
    }
    if (descricao) {
      dadosParaAtualizar.descricao = descricao;
    }
    if (status) {
      // Validação para garantir que o status seja um dos valores permitidos pelo Enum
      if (status === 'DISPONIVEL' || status === 'ADOTADO') {
        dadosParaAtualizar.status = status;
      } else {
        return res.status(400).json({ error: 'O status deve ser DISPONIVEL ou ADOTADO.' });
      }
    }

    const petAtualizado = await prisma.pet.update({
      where: { id: parseInt(id) },
      data: dadosParaAtualizar, // Usamos o objeto com os dados validados
    });

    res.status(200).json(petAtualizado);
  } catch (error) {
    // Adicionamos um log para ver o erro detalhado no terminal do servidor
    console.error(error); 
    res.status(500).json({ error: 'Não foi possível atualizar o pet.' });
  }
};

// DELETE
export const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.pet.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível remover o pet.' });
  }
};

// READ (Listar TODOS os pets)
export const getAllPets = async (req, res) => {
  try {
    const pets = await prisma.pet.findMany();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível listar todos os pets.' });
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