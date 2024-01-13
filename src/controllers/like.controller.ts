import { Request, Response } from "express";
import { erroServidor, erroNaoEncontrado } from "../util/response.helper";
import repository from "../database/prisma.repository";

export class LikeController {
    public async darLike(req: Request, res: Response) {
        try{

            const { idTweet, idUsuario } = req.params;

            const tweet = await repository.tweet.findUnique({
                where: {
                    id: idTweet,
                },
            });

            if(!tweet){
                return erroNaoEncontrado(res, "Tweet");
            }

            const like = await repository.like.findFirst({
                where: {
                    idTweet,
                    idUsuario,
                },
            });
            

            await repository.like.create({
                data: {
                    id: like?.id,
                    idTweet,
                    idUsuario,
                }
            });

            return res.status(201).send({
                ok: true,
                message: "Like adicionado com sucesso!",
            });
        }
        catch(error: any) {
            return erroServidor(res, error);
        }
    }

    //remover like
    public async removerLike(req: Request, res: Response) {
        try {
            const { idTweet, idUsuario } = req.params;

            const like = await repository.like.findFirst({
                where: {
                    idTweet,
                    idUsuario,
                },
            });

            if (!like) {
                return erroNaoEncontrado(res, "Like");
            }

            await repository.like.delete({
                where: {
                    id: like.id,
                },
            });

            return res.status(200).send({
                ok: true,
                message: "Like removido com sucesso!",
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }
}

