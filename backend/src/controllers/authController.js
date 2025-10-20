import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

// Função para registrar um novo usuário 
export const register = async (req, res) => {
  const { nome, email, senha, telefone, numero, rua, bairro, cidade, uf } = req.body;

  try {
    // Criptografa a senha
    const senhaHash = await bcrypt.hash(senha, 10);
    const telefonePadrao = telefone ? telefone.replace(/\D/g, '') : undefined;
    const ufPadronizado = uf ? uf.toUpperCase() : undefined;

    // Usamos uma transação para criar o Auth e o Adotante juntos
    const novoUsuario = await prisma.$transaction(async (prisma) => {
      // Cria o registro de autenticação
      const novoAuth = await prisma.auth.create({
        data: {
          email,
          senha: senhaHash,
          // role: 'USER'  O padrão já é USER no schema
        },
      });

      // Cria o registro do adotante e conecta com o auth criado acima
      const novoAdotante = await prisma.adotante.create({
        data: {
          nome,
          telefone: telefonePadrao,
          numero,
          rua,
          bairro,
          cidade,
          uf: ufPadronizado,
          auth_id: novoAuth.auth_id, // Conecta os dois registros
        },
      });

      return { ...novoAuth, adotante: novoAdotante };
    });

    // Remove a senha da resposta
    delete novoUsuario.senha;

    res.status(201).json(novoUsuario);
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
    // Encontra o usuário na tabela Auth pelo e-mail
    const auth = await prisma.auth.findUnique({
      where: { email },
    });

    if (!auth) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Compara a senha enviada com a senha criptografada no banco
    const senhaValida = await bcrypt.compare(senha, auth.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Gera o token JWT com o ID da tabela Auth
    const token = jwt.sign(
      { id: auth.auth_id, role: auth.role }, // Usa o auth_id
      JWT_SECRET,
      { expiresIn: '8h' } // Token expira em 8 horas
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível fazer o login.' });
  }
};