import { Request, Response } from "express";
import { camposNaoInformados, erroNaoEncontrado, erroServidor } from "../util/response.helper";
import repository from "../database/prisma.repository";
import { TweetModel } from "../models/tweet.model";

export class TweetController {
    public async criarTweet(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { conteudo, tipo } = req.body;
            const { authorization } = req.headers;

            if (!conteudo || !tipo) {
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

            const tweet = await repository.tweet.create({
                data: {
                    conteudo,
                    tipo,
                    usuario: {
                        connect: {
                            id: usuario.id
                        }
                    }
                }
            });

            return res.status(201).send({
                ok: true,
                message: "Tweet criado com sucesso!",
                data: tweet,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    public async listarTweets(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const tweets = await repository.tweet.findMany({
                where: {
                    idUsuario: id,
                },
            });

            if (!tweets) {
                return erroNaoEncontrado(res, "Tweets");
            }

            return res.status(200).send({
                ok: true,
                message: "Tweets encontrados com sucesso!",
                data: tweets,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    public async atualizarTweet(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { conteudo } = req.body;

            if (!conteudo) {
                return camposNaoInformados(res);
            }

            const tweet = await repository.tweet.findUnique({
                where: {
                    id,
                },
            });

            if (!tweet) {
                return erroNaoEncontrado(res, "Tweet");
            }

            const result = await repository.tweet.update({
                where: {
                    id,
                },
                data: {
                    conteudo,
                },
            });

            return res.status(200).send({
                ok: true,
                message: "Tweet atualizado com sucesso!",
                data: result,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    public async deletarTweet(req: Request, res: Response) {
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

            await repository.tweet.delete({
                where: {
                    id,
                },
            });

            return res.status(200).send({
                ok: true,
                message: "Tweet deletado com sucesso!",
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }
}
