import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE
export const createAdotante = async (req, res) => {
  try {
    const { nome, email, telefone, endereco } = req.body;
    const novoAdotante = await prisma.adotante.create({
      data: {
        nome,
        email,
        telefone,
        endereco,
      },
    });
    res.status(201).json(novoAdotante);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível cadastrar o adotante.' });
  }
};

// READ
export const getAllAdotantes = async (req, res) => {
  try {
    const adotantes = await prisma.adotante.findMany();
    res.status(200).json(adotantes);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível listar os adotantes.' });
  }
};