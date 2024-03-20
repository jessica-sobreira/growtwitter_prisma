import { Request, Response } from "express";
import { camposNaoInformados, erroNaoEncontrado, erroServidor } from "../util/response.helper";
import repository from "../database/prisma.repository";
import { ReplyModel } from "../models/reply.model";

export class ReplyController {

    public async criarReply(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { conteudo } = req.body;
            const { authorization } = req.headers;

            if (!conteudo) {
                return camposNaoInformados(res);
            }

            if (!authorization) {
                return res.status(401).send({
                    ok: false,
                    message: "Token de autenticação inválido",
                });
            }

            const usuario = await repository.usuario.findUnique({
                where: {
                    id,
                },
            });

            if (!usuario) {
                return erroNaoEncontrado(res, "Usuario");
            }

            if (usuario.token !== authorization) {
                return res.status(401).send({
                    ok: false,
                    message: "Token de autenticação inválido",
                });
            }

            // Verificar se o tweet existe
            const { idTweetOriginal } = req.body;
            const tweetOriginal = await repository.tweet.findUnique({
                where: {
                    id: idTweetOriginal,
                },
            });

            if (!tweetOriginal) {
                return erroNaoEncontrado(res, "Tweet Original");
            }

            const reply = new ReplyModel(conteudo, idTweetOriginal);

            const result = await repository.tweet.create({
                data: {
                    id: reply.id,
                    conteudo: reply.conteudo,
                    tipo: "Reply",
                    idUsuario: usuario.id,
                }
            });

            return res.status(201).send({
                ok: true,
                message: "Reply criado com sucesso!",
                data: result,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }


    public async listarReplies(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const tweet = await repository.tweet.findUnique({
                where: {
                    id,
                },
            });

            if (!tweet) {
                return erroNaoEncontrado(res, "Tweet");
            }

            const replies = await repository.tweet.findMany({
                where: {
                    id: id,

                },
            });

            return res.status(200).send({
                ok: true,
                message: "Replies encontrados com sucesso!",
                data: replies,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }


    public async deletarReply(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const reply = await repository.tweet.findUnique({
                where: {
                    id,
                },
            });

            if (!reply) {
                return erroNaoEncontrado(res, "Reply");
            }

            await repository.tweet.delete({
                where: {
                    id,
                },
            });

            return res.status(200).send({
                ok: true,
                message: "Reply deletado com sucesso!",
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }
}
