import { Result } from "../contracts/result.contract";
import repository from "../database/prisma.repository";
import { TweetType } from "../models/tweet.model";

export class TweetService {

    public async criarTweet(conteudo: string, tipo: TweetType, idUsuario: string): Promise<Result> {
        try {

            if (!conteudo) {
                return {
                    ok: false,
                    message: "Conteúdo não informado",
                    code: 400,
                };
            }


            const novoTweet = await repository.tweet.create({
                data: {
                    conteudo,
                    tipo,
                    usuario: {
                        connect: {
                            id: idUsuario
                        }
                    }
                }
            });

            return {
                ok: true,
                message: "Tweet criado com sucesso!",
                code: 200,    
                data: novoTweet,
            };

        } catch (error: any) {

            throw new Error(error);
        }
    }

    public async listarTweets(id: string): Promise<Result> {
        try {
            const tweets = await repository.tweet.findMany({
                where: {
                    idUsuario: id,
                },
            });

            if (!tweets || tweets.length === 0) {
                return {
                    ok: false,
                    message: "Tweets não encontrados",
                    code: 404,
                };
            }

            return {
                ok: true,
                message: "Tweets encontrados com sucesso!",
                code: 200,
                data: tweets,
            };

        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async atualizarTweet(id: string, conteudo: string): Promise<Result> {
        try {
            if (!conteudo) {
                return {
                    ok: false,
                    message: "Conteúdo não informado",
                    code: 400,
                };
            }

            const tweet = await repository.tweet.findUnique({
                where: {
                    id,
                },
            });

            if (!tweet) {
                return {
                    ok: false,
                    message: "Tweet não encontrado",
                    code: 404,
                };
            }

            const result = await repository.tweet.update({
                where: {
                    id,
                },
                data: {
                    conteudo,
                },
            });

            return {
                ok: true,
                message: "Tweet atualizado com sucesso!",
                code: 200,
                data: result,
            };

        } catch (error: any) {
            throw new Error(error);
        }
    }

    public async deletarTweet(id: string): Promise<Result> {
        try {
            const tweet = await repository.tweet.findUnique({
                where: {
                    id,
                },
            });

            if (!tweet) {
                return {
                    ok: false,
                    message: "Tweet não encontrado",
                    code: 404,
                };
            }

            await repository.tweet.delete({
                where: {
                    id,
                },
            });

            return {
                ok: true,
                message: "Tweet deletado com sucesso!",
                code: 200,
            };

        } catch (error: any) {
            throw new Error(error);
        }
    }
}