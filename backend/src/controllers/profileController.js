import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Buscar o Perfil (MODIFICADO)
export const getMyProfile = async (req, res) => {
  try {
    // req.user.id agora é o auth_id do token JWT
    const adotante = await prisma.adotante.findUnique({
      where: { auth_id: req.user.id }, 
      include: {
        auth: { // Inclui os dados de autenticação (como email e role)
          select: {
            email: true,
            role: true,
          }
        }
      }
    });

    if (!adotante) {
      return res.status(404).json({ error: 'Perfil não encontrado.' });
    }
    
    // Combina os dados para uma resposta mais completa
    const profileData = { ...adotante, ...adotante.auth };
    delete profileData.auth; // Remove o objeto aninhado 'auth'

    res.status(200).json(profileData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível buscar o perfil.' });
  }
};

// Atualiza o perfil (MODIFICADO)
export const updateMyProfile = async (req, res) => {
  try {
    const { nome, telefone, rua, numero, bairro, cidade, uf } = req.body;
    const dadosParaAtualizar = {};

    if (nome) dadosParaAtualizar.nome = nome;
    if (telefone) dadosParaAtualizar.telefone = telefone.replace(/\D/g, '');
    if (rua) dadosParaAtualizar.rua = rua;
    if (numero) dadosParaAtualizar.numero = numero;
    if (bairro) dadosParaAtualizar.bairro = bairro;
    if (cidade) dadosParaAtualizar.cidade = cidade;
    if (uf) dadosParaAtualizar.uf = uf.toUpperCase();

    // req.user.id é o auth_id
    const perfilAtualizado = await prisma.adotante.update({
      where: { auth_id: req.user.id },
      data: dadosParaAtualizar,
    });

    res.status(200).json(perfilAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível atualizar o perfil.' });
  }
};