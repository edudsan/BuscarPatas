import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 

const prisma = new PrismaClient();


const callbackURL = process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/auth/google/callback` : "/auth/google/callback";
console.log("Usando Callback URL:", callbackURL); // Log para depuração

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL, 
    scope: ['profile', 'email'] 
  },

  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const nomeCompleto = profile.displayName;
      const googleId = profile.id; 

      let authUser = await prisma.auth.findUnique({
        where: { email },
        include: { adotante: true } 
      });

      if (!authUser) {
        const placeholderSenha = await bcrypt.hash(`google_${googleId}`, 10); 

        authUser = await prisma.auth.create({
          data: {
            email: email,
            senha: placeholderSenha, 
            role: 'USER',
            adotante: {
              create: {
                nome: nomeCompleto || 'Usuário Google', 
                telefone: null,
                rua: null,
                numero: null,
                bairro: null,
                cidade: null,
                uf: null,
              }
            }
          },
          include: { adotante: true }
        });
      }

      return done(null, authUser); 

    } catch (error) {
      return done(error, null);
    }
  }
));

export default passport;