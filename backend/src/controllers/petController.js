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

// UPDATE
export const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, especie, data_nascimento, descricao, status } = req.body;
    const petAtualizado = await prisma.pet.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        especie,
        data_nascimento: new Date(data_nascimento),
        descricao,
        status,
      },
    });
    res.status(200).json(petAtualizado);
  } catch (error) {
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