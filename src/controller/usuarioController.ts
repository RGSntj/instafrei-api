import { UsuarioService } from "../service/usuarioService.js";

import { Request, Response } from "express";
import { JWT } from "../utils/jwt.js";

export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwt: JWT
  ) {}

  async criar(req: Request, res: Response) {
    try {
      const usuario = req.body;
      const idCriado = await this.usuarioService.criar(usuario);

      return res.send({
        id: idCriado,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({
          erro: error.message,
        });
      }
    }
  }

  async logar(req: Request, res: Response) {
    try {
      const objUsuario = req.body;
      const usuario = await this.usuarioService.buscarUsuario(objUsuario);

      const token = this.jwt.gerarToken(usuario);

      return res.send({
        token: token,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({
          erro: error.message,
        });
      }
    }
  }

  async perfil(req: Request, res: Response) {
    try {
      const id = req.user!.id;
      const usuario = await this.usuarioService.perfil(id);

      return res.send(usuario);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({
          erro: error.message,
        });
      }
    }
  }
}
