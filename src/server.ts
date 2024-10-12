import "dotenv/config";

import express from "express";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import postagemRoutes from "./routes/postagemRoutes.js";

const server = express();
server.use(cors());
server.use(express.json());

server.use("/api", usuarioRoutes);
server.use("/api", postagemRoutes);

server.listen(3001, () => console.log("Servidor rodando !"));
