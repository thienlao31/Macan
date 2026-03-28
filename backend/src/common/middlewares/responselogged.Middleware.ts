import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";
@Injectable()

export class ResponseLoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const start = Date.now();
        res.on('finish', ()=> {
            console.log(
                `Here is a description of the Response,
                ${req.baseUrl},                
                ${res.statusCode},
                the times is ${Date.now() - start}`
            )
        })
        next();
    }
}