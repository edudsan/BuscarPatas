import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE
export const createAdotante = async (req, res) => {
  try {
    const { nome, email, telefone, rua, numero, bairro, cidade, uf } = req.body;

    const telefoneSanitizado = telefone ? telefone.replace(/\D/g, '') : undefined;
    
    const novoAdotante = await prisma.adotante.create({
      data: {
        nome,
        email,
        telefone: telefoneSanitizado,
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
        // Filtra por adotantes que não têm nenhuma relação em adocoes
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
    // Extrai todos os possíveis campos do corpo da requisição
    const { nome, email, telefone, rua, numero, bairro, cidade, uf } = req.body;

    const dadosParaAtualizar = {};

    // Verifica campo por campo e adiciona ao objeto de atualização
    if (nome) dadosParaAtualizar.nome = nome;
    if (email) dadosParaAtualizar.email = email;
    if (rua) dadosParaAtualizar.rua = rua;
    if (numero) dadosParaAtualizar.numero = numero;
    if (bairro) dadosParaAtualizar.bairro = bairro;
    if (cidade) dadosParaAtualizar.cidade = cidade;
    if (uf) dadosParaAtualizar.uf = uf;
    if (telefone) 
      dadosParaAtualizar.telefone = telefone.replace(/\D/g, '');
    
    

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

    res.status(204).send(); 
  } catch (error) {
    // Trata o caso em que o adotante com o ID fornecido não é encontrado
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Adotante não encontrado.' });
    }
    res.status(500).json({ error: 'Não foi possível remover o adotante.' });
  }
};