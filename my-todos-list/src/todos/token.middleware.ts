import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {admin, TodosService} from "./todos.service";

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const accessToken = req.headers.authorization.split(" ")[1]
        res.locals.decodedToken =  await admin.auth().verifyIdToken(accessToken)
        next();
    }
}
