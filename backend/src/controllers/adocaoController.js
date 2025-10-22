import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE
export const createAdocao = async (req, res) => {
  const { pet_id } = req.body;
  
  const auth_id_do_token = req.user.id; 

  const petIdNum = parseInt(pet_id);
  if (isNaN(petIdNum)) {
    return res.status(400).json({ error: 'ID do Pet inválido.' });
  }

  try {
    const adotanteProfile = await prisma.adotante.findUnique({
        where: { auth_id: auth_id_do_token },
        select: { adotante_id: true } 
    });

    if (!adotanteProfile) {
        return res.status(404).json({ error: 'Perfil de adotante não encontrado para este usuário logado.' });
    }
    
    const adotanteIdNum = adotanteProfile.adotante_id; 

    const novaAdocao = await prisma.$transaction(async (prisma) => {
      
      const adocao = await prisma.adocao.create({
        data: {
          pet_id: petIdNum,
          adotante_id: adotanteIdNum,
        },
        include: {
          pet: true,
          adotante: true,
        },
      });

      await prisma.pet.update({
        where: { pet_id: petIdNum },
        data: { status: 'ADOTADO' },
      });

      return adocao;
    });

    res.status(201).json(novaAdocao);

  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Este pet já foi adotado.' });
    }
    console.error('ERRO AO PROCESSAR ADOCAO:', error); 
    res.status(500).json({ error: 'Não foi possível processar a adoção.' });
  }
};

// READ (Listar todas as adoções - ADMIN)
export const getAllAdocoes = async (req, res) => {
  try {
    const { search, sort } = req.query;

    const where = {};
    if (search) {
      where.OR = [
        {
          pet: {
            nome: { contains: search, mode: 'insensitive' },
          },
        },
        {
          adotante: {
            nome: { contains: search, mode: 'insensitive' },
          },
        },
      ];
    }

    const orderBy = {
      data_adocao: sort === 'asc' ? 'asc' : 'desc',
    };

    const adocoes = await prisma.adocao.findMany({
      where: where,
      orderBy: orderBy,
      include: {
        pet: true,
        adotante: true, 
      },
    });
    res.status(200).json(adocoes);
  } catch (error) {
    console.error('Erro ao listar adoções:', error);
    res.status(500).json({ error: 'Não foi possível listar as adoções.' });
  }
};

// READ (Listar minhas adoções - Apenas o usuário logado)
export const getMyAdocoes = async (req, res) => {
  try {
    const adotanteProfile = await prisma.adotante.findUnique({
      where: { auth_id: req.user.id },
    });

    if (!adotanteProfile) {
      return res.status(404).json({ error: 'Perfil de adotante não encontrado.' });
    }

    const adocoes = await prisma.adocao.findMany({
      where: { adotante_id: adotanteProfile.adotante_id },
      include: {
        pet: true, 
      },
      orderBy: {
        data_adocao: 'desc', 
      }
    });
    res.status(200).json(adocoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível listar suas adoções.' });
  }
};

// UPDATE (Apenas ADMIN)
export const updateAdocao = async (req, res) => {
  try {
    const { id } = req.params;
    const { pet_id, adotante_id, data_adocao } = req.body;

    const adocaoAtualizada = await prisma.$transaction(async (prisma) => {
      const adocaoOriginal = await prisma.adocao.findUnique({
        where: { adocao_id: parseInt(id) },
      });
      if (!adocaoOriginal) throw new Error('Adoção não encontrada.');

      const petIdAntigo = adocaoOriginal.pet_id;
      const petIdNovo = pet_id ? parseInt(pet_id) : null;

      const dadosParaAtualizar = {};

      if (petIdNovo && petIdNovo !== petIdAntigo) {
        await prisma.pet.update({ where: { pet_id: petIdAntigo }, data: { status: 'DISPONIVEL' } });
        await prisma.pet.update({ where: { pet_id: petIdNovo }, data: { status: 'ADOTADO' } });
        
        dadosParaAtualizar.pet_id = petIdNovo;
        
        dadosParaAtualizar.data_adocao = new Date(); 
      }

      if (adotante_id && adotante_id !== adocaoOriginal.adotante_id) {
        dadosParaAtualizar.adotante_id = parseInt(adotante_id);
        
        if (!dadosParaAtualizar.data_adocao) {
          dadosParaAtualizar.data_adocao = new Date();
        }
      }

      if (data_adocao) {
        dadosParaAtualizar.data_adocao = new Date(data_adocao);
      }
      
      if (Object.keys(dadosParaAtualizar).length === 0) {
        return adocaoOriginal;
      }

      return await prisma.adocao.update({
        where: { adocao_id: parseInt(id) },
        data: dadosParaAtualizar,
      });
    });

    res.status(200).json(adocaoAtualizada);
  } catch (error) {
    if (error.message === 'Adoção não encontrada.') {
      return res.status(404).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: 'Não foi possível atualizar a adoção.' });
  }
};

// DELETE (Apenas ADMIN)
export const deleteAdocao = async (req, res) => {
  try {
    const { id } = req.params;

    const adocaoDeletada = await prisma.$transaction(async (prisma) => {
      const adocao = await prisma.adocao.findUnique({ where: { adocao_id: parseInt(id) } });
      if (!adocao) throw new Error('Adoção não encontrada.');

      await prisma.pet.update({ where: { pet_id: adocao.pet_id }, data: { status: 'DISPONIVEL' } });

      return await prisma.adocao.delete({ where: { adocao_id: parseInt(id) } });
    });

    res.status(204).send();
  } catch (error) {
    if (error.message === 'Adoção não encontrada.') {
      return res.status(404).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: 'Não foi possível cancelar a adoção.' });
  }
};
