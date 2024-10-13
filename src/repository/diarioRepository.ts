import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../db/connection.js";

export interface IDiario {
  dia: Date;
  conteudo: string;
}

export class DiarioRepository {
  async criar(diario: IDiario, idUsuario: string) {
    const comando = `INSERT INTO tb_diario (dt_dia, ds_conteudo, id_usuario)
                            VALUES (SYSDATE(), ?, ?)`;

    const resposta = await db.query<ResultSetHeader>(comando, [
      diario.conteudo,
      idUsuario,
    ]);

    return resposta[0].insertId;
  }

  async meusDiarios(idUsuario: string) {
    const comando = `SELECT 
                        D.id_diario		"id",
                        D.dt_dia			"dia",
                        D.ds_conteudo	"conteudo",
                        U.nm_usuario	"autor"
                     FROM tb_diario D
                      JOIN tb_usuario U ON D.id_usuario = U.id_usuario
                        WHERE U.id_usuario = ?`;

    const diarios = await db.query<RowDataPacket[]>(comando, [idUsuario]);
    return diarios[0];
  }
}
