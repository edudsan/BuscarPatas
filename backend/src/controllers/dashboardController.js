import { prisma } from '../config/prisma.js';

export const getDashboardCounts = async (req, res) => {
  try {
    const totalPets = await prisma.pet.count();

    const totalAdotantes = await prisma.auth.count({
      where: {
        role: 'USER', 
      },
    });

    const petsAdotados = await prisma.adocao.count(); 

    res.status(200).json({
      totalPets: totalPets,
      totalAdotantes: totalAdotantes,
      petsAdotados: petsAdotados,
    });

  } catch (error) {
    console.error('Erro ao buscar contagens do dashboard:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar dados.' });
  }
};