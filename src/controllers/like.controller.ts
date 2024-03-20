import { Request, Response } from "express";
import { erroServidor, erroNaoEncontrado } from "../util/response.helper";
import repository from "../database/prisma.repository";

export class LikeController {
    public async darLike(req: Request, res: Response) {
        try {
            const { idTweet, idUsuario } = req.params;

            const tweet = await repository.tweet.findUnique({
                where: {
                    id: idTweet,
                },
            });

            if (!tweet) {
                return erroNaoEncontrado(res, "Tweet");
            }

            const existingLike = await repository.like.findFirst({
                where: {
                    idTweet,
                    idUsuario,
                },
            });

            if (existingLike) {
                return res.status(400).send({
                    ok: false,
                    message: "Usuário já deu like neste tweet",
                });
            }

            await repository.like.create({
                data: {
                    idTweet,
                    idUsuario,
                },
            });

            return res.status(201).send({
                ok: true,
                message: "Like adicionado com sucesso!",
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }


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
