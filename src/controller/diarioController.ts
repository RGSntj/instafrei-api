import { Request, Response } from "express";
import { DiarioService } from "../service/diarioService.js";

export class DiarioController {
  constructor(private readonly diarioService: DiarioService) {}

  async criar(req: Request, resp: Response) {
    try {
      const diario = req.body;
      const idUsuario = req.user!.id;

      const id = await this.diarioService.criar(diario, idUsuario);

      return resp.send({
        idCriado: id,
      });
    } catch (error) {
      if (error instanceof Error) {
        return resp.status(400).send({
          erro: error.message,
        });
      }
    }
  }
}
