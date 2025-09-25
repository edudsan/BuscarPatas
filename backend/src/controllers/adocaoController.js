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
        where: { pet_id: parseInt(pet_id) },
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

// UPDATE (Atualizar uma adoção - ex: corrigir qual pet ou adotante)
export const updateAdocao = async (req, res) => {
  try {
    const { id } = req.params;
    const { pet_id, adotante_id, data_adocao } = req.body;

    // Usamos uma transação para garantir a consistência dos dados
    const adocaoAtualizada = await prisma.$transaction(async (prisma) => {
      const adocaoOriginal = await prisma.adocao.findUnique({
        where: { adocao_id: parseInt(id) },
      });

      if (!adocaoOriginal) {
        throw new Error('Adoção não encontrada.');
      }

      const petIdAntigo = adocaoOriginal.pet_id;
      const petIdNovo = pet_id ? parseInt(pet_id) : null;


      if (petIdNovo && petIdNovo !== petIdAntigo) {

        await prisma.pet.update({
          where: { pet_id: petIdAntigo },
          data: { status: 'DISPONIVEL' },
        });

        await prisma.pet.update({
          where: { pet_id: petIdNovo },
          data: { status: 'ADOTADO' },
        });
      }

      const dadosParaAtualizar = {};
      if (petIdNovo) dadosParaAtualizar.pet_id = petIdNovo;
      if (adotante_id) dadosParaAtualizar.adotante_id = parseInt(adotante_id);
      if (data_adocao) dadosParaAtualizar.data_adocao = new Date(data_adocao);


      const adocao = await prisma.adocao.update({
        where: { adocao_id: parseInt(id) },
        data: dadosParaAtualizar,
      });

      return adocao;
    });

    res.status(200).json(adocaoAtualizada);
  } catch (error) {
    if (error.message === 'Adoção não encontrada.') {
      return res.status(404).json({ error: error.message });
    }
    // Adiciona um log para depuração no terminal
    console.error(error);
    res.status(500).json({ error: 'Não foi possível atualizar a adoção.' });
  }
};

// DELETE (Cancelar/deletar uma adoção)
export const deleteAdocao = async (req, res) => {
  try {
    const { id } = req.params;

    // Usa uma transação para garantir que as duas operações ocorram com sucesso
    const adocaoDeletada = await prisma.$transaction(async (prisma) => {
      // Encontra a adoção para saber qual pet está associado a ela
      const adocao = await prisma.adocao.findUnique({
        where: { adocao_id: parseInt(id) },
      });

      if (!adocao) {
        throw new Error('Adoção não encontrada.');
      }


      // Atualiza o status do pet de volta para "DISPONIVEL"
      await prisma.pet.update({
        where: { pet_id: adocao.pet_id },
        data: { status: 'DISPONIVEL' },
      });

      //  Deleta o registro da adoção
      return await prisma.adocao.delete({
        where: { adocao_id: parseInt(id) },
      });
    });

    res.status(204).send();
  } catch (error) {
    if (error.message === 'Adoção não encontrada.') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Não foi possível cancelar a adoção.' });
  }
};