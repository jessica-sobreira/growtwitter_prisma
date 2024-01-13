import { NextFunction, Request, Response } from "express";

export function validarAcesso(req: Request, res: Response, next: NextFunction){
    try{
        const { email, senha } = req.body;

        if(!email) {
            return res.status(400).send({
                ok: false,
                message: "Email obrigatório",
            });
        }

        if(!senha){
            return res.status(400).send({
                ok: false,
                message: "Senha obrigatória",
            });
        }

        next();

    }
    catch(error: any){
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
}