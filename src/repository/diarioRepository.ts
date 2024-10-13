import { ResultSetHeader } from "mysql2";
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
}
