import "dotenv/config";

import express from "express";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import diarioRoutes from "./routes/diarioRoutes.js";

const server = express();
server.use(cors());
server.use(express.json());

server.use("/api", usuarioRoutes);
server.use("/api", diarioRoutes);

server.listen(3001, () => console.log("Servidor rodando !"));
