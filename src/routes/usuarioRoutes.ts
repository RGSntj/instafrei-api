import { Router } from "express";
import { UsuarioController } from "../controller/usuarioController.js";
import { UsuarioService } from "../service/usuarioService.js";
import { UsuarioRepository } from "../repository/usuarioRepository.js";

import { JWT } from "../utils/jwt.js";

const router = Router();

const jwt = new JWT();

const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);
const usuarioController = new UsuarioController(usuarioService, jwt);

router.post("/usuario", usuarioController.criar.bind(usuarioController));
router.post("/login", usuarioController.logar.bind(usuarioController));

router.get(
  "/pefil",
  jwt.autenticacao,
  usuarioController.perfil.bind(usuarioController)
);

export default router;
