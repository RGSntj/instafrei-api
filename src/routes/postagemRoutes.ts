import { Router } from "express";

import { PostagemController } from "../controller/postagemController.js";
import { PostagemService } from "../service/postagemService.js";
import { PostagemRepository } from "../repository/postagemRepository.js";
import { JWT } from "../utils/jwt.js";

const router = Router();
const jwt = new JWT();

const postagemRepository = new PostagemRepository();
const postagemService = new PostagemService(postagemRepository);
const postagemController = new PostagemController(postagemService);

router.post(
  "/postagem",
  jwt.autenticacao,
  postagemController.criar.bind(postagemController)
);

router.get("/postagens", postagemController.postagens.bind(postagemController));

export default router;
