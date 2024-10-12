import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

import "dotenv/config";

const KEY = process.env.KEY_JWT!;

interface TokenPayload {
  id: string;
  usuario: string;
}

export class JWT {
  gerarToken(payload: Record<string, string>, expiresIn: string = "1hr") {
    return jwt.sign(payload, KEY, { expiresIn });
  }

  autenticacao(req: Request, resp: Response, next: NextFunction) {
    try {
      const token = req.headers["authorization"]?.split("Bearer ")[1];

      if (!token) throw new Error("Token inválido.");

      const decoded = jwt.verify(token, KEY) as TokenPayload;

      req.user = { id: decoded.id, usuario: decoded.usuario };

      next();
    } catch (error) {
      if (error instanceof Error) {
        return resp.status(401).end();
      }
    }
  }
}
