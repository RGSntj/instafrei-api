import { IUser, UsuarioRepository } from "../repository/usuarioRepository.js";

import { hash, compare } from "bcrypt";

export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async criar(usuario: IUser) {
    const emailJaExiste = await this.usuarioRepository.buscarUsuarioPeloEmail(
      usuario.email
    );

    if (emailJaExiste) throw new Error("Este e-mail já está cadastrado !");

    const hashSenha = await hash(usuario.senha, 8);

    const id = await this.usuarioRepository.criar({
      nome: usuario.nome,
      email: usuario.email,
      senha: hashSenha,
    });

    return id;
  }

  async buscarUsuario(objUsuario: IUser) {
    const usuario = await this.usuarioRepository.buscarUsuarioPeloEmail(
      objUsuario.email
    );

    if (!usuario) throw new Error("Usuário não encontrado !");

    const senha = await compare(objUsuario.senha, usuario.ds_senha);

    if (!senha) throw new Error("Senha inválida.");

    return {
      id: usuario.id_usuario,
      usuario: usuario.nm_usuario,
    };
  }

  async perfil(id: string) {
    const usuario = await this.usuarioRepository.buscarInformacoesUsuario(id);

    return usuario;
  }
}
