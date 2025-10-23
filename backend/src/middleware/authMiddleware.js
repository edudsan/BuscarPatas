import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_super_secreto';

// Middleware que verifica se o usuário está autenticado
export const protect = (req, res, next) => {
  // Checa se o cabeçalho de autorização existe e começa com 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Pega o token do cabeçalho (formato: "Bearer TOKEN")
      const token = req.headers.authorization.split(' ')[1];

      // Verifica e decodifica o token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Anexa os dados do usuário (id, role) à requisição para uso posterior
      // req.user terá { id: auth_id, role: 'ADMIN'/'USER' }
      req.user = decoded;

      // Se o token for válido, avança para a próxima função (controller)
      return next();
    } catch (error) {
      // Token inválido (assinatura, expirado, etc.)
      return res.status(401).json({ error: 'Token inválido ou expirado. Acesso não autorizado.' });
    }
  }

  // Se não houver token no cabeçalho ou o formato for incorreto
  return res.status(401).json({ error: 'Nenhum token fornecido. Acesso não autorizado.' });
};

// Middleware que verifica se o usuário é um ADMIN
export const isAdmin = (req, res, next) => {
  // Confirma que req.user foi anexado pelo middleware 'protect' e verifica o papel
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    return res.status(403).json({ error: 'Acesso negado. Rota exclusiva para administradores.' });
  }
};
