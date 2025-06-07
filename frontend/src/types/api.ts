export interface User {
  _id: string;
  email: string;
  nome?: string;
  telefone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PerfilResponse {
  user: User;
}

export interface AuthResponse {
  token: string;
  message?: string;
}
