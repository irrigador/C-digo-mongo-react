const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema(
  {
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    cpf: { type: String, required: true },
    matricula: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, min: 6, required: true },
  },
  {
    timestamps: true,
  }
);

usuarioSchema.pre("save", async function (next) {
  const usuario = this; // 
  const hash = await bcrypt.hash(this.senha, 10, usuario); // 
  this.senha = hash;
  next();
});

usuarioSchema.methods.isValidPassword = async function (senha) {
  const usuario = this;
  const compare = await bcrypt.compare(senha, usuario.senha);
  return compare;
};

module.exports = mongoose.model("Usuario", usuarioSchema);
