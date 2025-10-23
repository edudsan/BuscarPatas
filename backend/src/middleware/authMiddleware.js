import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_super_secreto';

// Middleware que verifica se o usuário está autenticado
export const protect = (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Pega o token do cabeçalho (formato: "Bearer TOKEN")
      token = req.headers.authorization.split(' ')[1];
      
      // Verifica e decodifica o token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Anexa os dados do usuário (id, role) à requisição para uso posterior
      req.user = decoded;
      
      next(); // Passa para a próxima função (o controller da rota)
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido ou expirado. Acesso não autorizado.' });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Nenhum token fornecido. Acesso não autorizado.' });
  }
};

// Middleware que verifica se o usuário é um ADMIN
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    return res.status(403).json({ error: 'Acesso negado. Rota exclusiva para administradores.' });
  }
};