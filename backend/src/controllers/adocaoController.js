import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE
export const createAdocao = async (req, res) => {
  const { pet_id, adotante_id } = req.body;

  try {
    const novaAdocao = await prisma.$transaction(async (prisma) => {
      const adocao = await prisma.adocao.create({
        data: {
          pet_id: parseInt(pet_id),
          adotante_id: parseInt(adotante_id),
        },
        include: {
          pet: true,
          adotante: true,
        },
      });

      await prisma.pet.update({
        where: { id: parseInt(pet_id) },
        data: { status: 'ADOTADO' },
      });

      return adocao;
    });

    res.status(201).json(novaAdocao);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Este pet já foi adotado.' });
    }
    res.status(500).json({ error: 'Não foi possível processar a adoção.' });
  }
};

// READ
export const getAllAdocoes = async (req, res) => {
  try {
    const adocoes = await prisma.adocao.findMany({
      include: {
        pet: true,
        adotante: true,
      },
    });
    res.status(200).json(adocoes);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível listar as adoções.' });
  }
};