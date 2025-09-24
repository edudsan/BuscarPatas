import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE
export const createAdotante = async (req, res) => {
  try {
    // Adicionamos os novos campos de endereço
    const { nome, email, telefone, rua, numero, bairro, cidade, uf } = req.body;
    const novoAdotante = await prisma.adotante.create({
      data: {
        nome,
        email,
        telefone,
        rua,
        numero,
        bairro,
        cidade,
        uf,
      },
    });
    res.status(201).json(novoAdotante);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível cadastrar o adotante.' });
  }
};

// READ (Listar todos)
export const getAllAdotantes = async (req, res) => {
  try {
    const adotantes = await prisma.adotante.findMany();
    res.status(200).json(adotantes);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível listar os adotantes.' });
  }
};

// READ (Listar adotantes que ainda não adotaram)
export const getAdotantesSemAdocao = async (req, res) => {
  try {
    const adotantes = await prisma.adotante.findMany({
      where: {
        // Filtra por adotantes que não têm nenhuma relação em 'adocoes'
        adocoes: {
          none: {},
        },
      },
    });
    res.status(200).json(adotantes);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível listar os adotantes.' });
  }
};

// UPDATE (Atualização parcial)
export const updateAdotante = async (req, res) => {
  try {
    const { id } = req.params;
    const dadosParaAtualizar = req.body; // Pega todos os campos enviados

    const adotanteAtualizado = await prisma.adotante.update({
       where: { adotante_id: parseInt(id) },
      data: dadosParaAtualizar,
    });
    res.status(200).json(adotanteAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível atualizar o adotante.' });
  }
};

// DELETE
export const deleteAdotante = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o adotante possui alguma adoção registrada
    const adocoesDoAdotante = await prisma.adocao.count({
      where: {
        adotante_id: parseInt(id),
      },
    });

    // Se houver adoções, retorna um erro e impede a exclusão
    if (adocoesDoAdotante > 0) {
      return res.status(409).json({ 
        error: 'Este adotante não pode ser excluído pois possui adoções registradas.' 
      });
    }

    // Se não houver adoções, prossegue com a exclusão
    await prisma.adotante.delete({
      where: { adotante_id: parseInt(id) },
    });

    res.status(204).send(); // Resposta de sucesso sem conteúdo
  } catch (error) {
    // Trata o caso em que o adotante com o ID fornecido não é encontrado
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Adotante não encontrado.' });
    }
    res.status(500).json({ error: 'Não foi possível remover o adotante.' });
  }
};