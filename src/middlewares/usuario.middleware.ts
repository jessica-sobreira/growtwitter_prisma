import { NextFunction, Request, Response } from "express";

export function validarAcesso(req: Request, res: Response, next: NextFunction) {
    try {

        const token = req.headers.authorization;

        if(!token) {
            return res.status(401).send({
                ok: false,
                message: "Token ausente",
            });
        }

        

        next();

    } catch (error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
}
