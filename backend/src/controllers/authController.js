import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_super_secreto'; 

// Função para registrar um novo usuário (adotante)
export const register = async (req, res) => {
  const { nome, email, senha, telefone, numero, rua, bairro, cidade, uf } = req.body;

  try {
    // Criptografa a senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);
    const telefonePadrao = telefone ? telefone.replace(/\D/g, '') : undefined;
    const ufPadronizado = uf ? uf.toUpperCase() : undefined;

    const novoAdotante = await prisma.adotante.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        telefone: telefonePadrao,
        numero,
        rua,
        bairro,
        cidade,
        uf: ufPadronizado,
      },
    });

    // Remove a senha da resposta por segurança
    delete novoAdotante.senha;

    res.status(201).json(novoAdotante);
  } catch (error) {
    // Trata o caso de e-mail já existente
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Este e-mail já está em uso.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Não foi possível registrar o usuário.' });
  }
};

// Função para fazer login
export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // 1. Encontra o usuário pelo e-mail
    const adotante = await prisma.adotante.findUnique({
      where: { email },
    });

    if (!adotante) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // 2. Compara a senha enviada com a senha criptografada no banco
    const senhaValida = await bcrypt.compare(senha, adotante.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // 3. Gera o token JWT
    const token = jwt.sign(
      { id: adotante.adotante_id, role: adotante.role },
      JWT_SECRET,
      { expiresIn: '8h' } // Token expira em 8 horas
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível fazer o login.' });
  }
};