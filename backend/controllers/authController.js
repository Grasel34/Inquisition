import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { blacklistToken } from '../utils/tokenBlacklist.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

export const register = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await User.create({ email, senha: senhaHash });

    const token = jwt.sign({ id: novoUsuario._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar.', error });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(401).json({ message: 'Usuário não encontrado.' });

    const valido = await bcrypt.compare(senha, usuario.senha);
    if (!valido) return res.status(401).json({ message: 'Senha incorreta.' });

    const token = jwt.sign({ id: usuario._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login.', error });
  }
};

export const getPerfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.userId).select('-senha');
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado.' });

    res.json({ user: usuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil.', error });
  }
};

export const updatePerfil = async (req, res) => {
  const { nome, telefone } = req.body;

  try {
    const usuario = await User.findByIdAndUpdate(
      req.userId,
      { nome, telefone },
      { new: true }
    ).select('-senha');

    res.json({ user: usuario });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar perfil.', error });
  }
};

export const logout = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(400).json({ message: 'Token não fornecido.' });

  const [, token] = authHeader.split(' ');
  blacklistToken(token);
  res.json({ message: 'Logout realizado com sucesso.' });
};
