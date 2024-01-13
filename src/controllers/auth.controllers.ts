import { Request, Response } from "express";
import { camposNaoInformados, erroServidor } from "../util/response.helper";
import repository from "../database/prisma.repository";
import { randomUUID } from "crypto";


export class AuthController {

    public async login(req: Request, res: Response) {
        try {

            const { email, senha } = req.body;

            if(!email || !senha){
                return camposNaoInformados(res);
            }

            const usuario = await repository.usuario.findFirst({
                where: {
                    email,
                    senha,
                },
                select: {
                    id: true,
                    nome: true,
                },
            });

            if(!usuario){
                return res.status(401).send({
                    ok: false,
                    message: "Credenciais inválidas",
                });
            }

            const token = randomUUID();

            await repository.usuario.update({
                where: {
                    id: usuario.id,
                },
                data: {
                    token,
                },
            });

            return res.status(200).send({
                ok: true,
                message: "Login realizado com sucesso!",
                data: {
                    id: usuario.id,
                    nome: usuario.nome,
                    token,
                }
            });
        } 
        catch(error: any) {
            return erroServidor(res, error);
        }
    }
}