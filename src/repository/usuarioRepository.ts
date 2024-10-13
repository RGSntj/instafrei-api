import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../db/connection.js";

export type IUser = {
  nome: string;
  email: string;
  senha: string;
};

export class UsuarioRepository {
  async criar(usuario: IUser) {
    const comando = `INSERT INTO tb_usuario (nm_usuario, ds_email, ds_senha)
                            VALUES (?, ?, ?)`;

    const resposta = await db.query<ResultSetHeader>(comando, [
      usuario.nome,
      usuario.email,
      usuario.senha,
    ]);

    return resposta[0].insertId;
  }

  async buscarUsuarioPeloEmail(email: string) {
    const comando = `SELECT * FROM tb_usuario
                        WHERE ds_email = ?`;

    const resposta = await db.query<RowDataPacket[]>(comando, [email]);
    return resposta[0][0];
  }

  async buscarInformacoesUsuario(id: string) {
    const comando = `SELECT
                      id_usuario  id,
                      nm_usuario  usuario,
                      ds_email    email
                     FROM tb_usuario
                          WHERE id_usuario = ?`;

    const resposta = await db.query<RowDataPacket[]>(comando, [id]);
    return resposta[0][0];
  }
}
