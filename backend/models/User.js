import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    senha: {
      type: String,
      required: true,
    },
    nome: {
      type: String,
      default: '',
    },
    telefone: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // cria campos createdAt e updatedAt
  }
);

const User = mongoose.model('User', userSchema);

export default User;
