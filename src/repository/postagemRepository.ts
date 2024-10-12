import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../db/connection.js";

export interface IPostagem {
  titulo: string;
  descricao: string;
}

export class PostagemRepository {
  async criar(postagem: IPostagem, idUsuario: string) {
    const comando = `INSERT INTO tb_postagem (nm_postagem, ds_postagem, id_usuario)
                                VALUES (?, ?, ?)`;

    const resposta = await db.query<ResultSetHeader>(comando, [
      postagem.titulo,
      postagem.descricao,
      idUsuario,
    ]);

    return resposta[0].insertId;
  }

  async pegarTodasAsPostagens() {
    const comando = `SELECT
                        P.id_postagem		"id",
                        U.nm_usuario		"autor",
                        P.nm_postagem		"titulo",
                        P.ds_postagem		"descrição",
                        P.dt_criacao		"data criada"
                     FROM tb_postagem P
                      JOIN tb_usuario U ON P.id_usuario = U.id_usuario`;

    const resposta = await db.query<RowDataPacket[]>(comando);
    return resposta[0];
  }
}
