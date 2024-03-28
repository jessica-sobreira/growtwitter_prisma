import { Request, Response } from "express";
import { camposNaoInformados, erroNaoEncontrado, erroServidor } from "../util/response.helper";
import repository from "../database/prisma.repository";
import { ReplyModel } from "../models/reply.model";

export class ReplyService {

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

            return result;
        } catch (error: any) {
            throw error;
        }
    }

    public async listarReplies(id: string) {
        try {
            const tweet = await repository.tweet.findUnique({
                where: {
                    id,
                },
            });

            if (!tweet) {
                throw new Error("Tweet não encontrado");
            }

            const replies = await repository.tweet.findMany({
                where: {
                    id: id,
                },
            });

            return replies;
        } catch (error: any) {
            throw error;
        }
    }

    public async deletarReply(id: string) {
        try {
            const reply = await repository.tweet.findUnique({
                where: {
                    id,
                },
            });

            if (!reply) {
                throw new Error("Reply não encontrado");
            }

            await repository.tweet.delete({
                where: {
                    id,
                },
            });

            return;
        } catch (error: any) {
            throw error;
        }
    }
}