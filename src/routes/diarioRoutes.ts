import { Router } from "express";

import { DiarioController } from "../controller/diarioController.js";
import { DiarioService } from "../service/diarioService.js";
import { DiarioRepository } from "../repository/diarioRepository.js";

import { JWT } from "../utils/jwt.js";

const endpoints = Router();

const diarioRepository = new DiarioRepository();
const diarioService = new DiarioService(diarioRepository);
const diarioController = new DiarioController(diarioService);

const jwt = new JWT();

endpoints.post(
  "/diario",
  jwt.autenticacao,
  diarioController.criar.bind(diarioController)
);

export default endpoints;
