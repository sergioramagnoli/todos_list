import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { admin } from "../firebase";

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization.split(" ")[1];
    req.user = await admin.auth().verifyIdToken(accessToken);
    next();
  }
}
