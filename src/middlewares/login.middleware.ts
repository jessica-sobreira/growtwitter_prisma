import { NextFunction, Request, Response } from "express";

export async function validaMiddlewareLogin (req: Request, res: Response, next: NextFunction) {

    try {

        const { authorization } = req.headers;
        const { id } = req.params

        if(!authorization) {
            return res.status(401).send({
                ok: false,
                message: "Token de autenticação não foi informado"
            })
        }

        next()
    
    } catch(error: any) {
        return res.status(500).send({
            ok: false, 
            message: error.toString(),
        })

    }

}