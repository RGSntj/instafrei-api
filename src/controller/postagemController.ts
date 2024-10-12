import { Request, Response } from "express";
import { PostagemService } from "../service/postagemService.js";

export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  async criar(req: Request, res: Response) {
    try {
      const postagem = req.body;
      const idUsuario = req.user!.id;

      const idCriado = await this.postagemService.criar(postagem, idUsuario);

      return res.status(201).send({
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

  async postagens(req: Request, resp: Response) {
    try {
      const postagens = await this.postagemService.pegarTodasAsPostagens();

      return resp.send(postagens);
    } catch (error) {
      if (error instanceof Error) {
        return resp.status(400).send({
          erro: error.message,
        });
      }
    }
  }
}
