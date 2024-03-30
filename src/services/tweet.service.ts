import { Result } from "../contracts/result.contract";
import repository from "../database/prisma.repository";
import { TweetModel, TweetType } from "../models/tweet.model";

export class TweetService {

    /**
     * Cria um tweet
     * 
     * 
     * COLOQUE NO BODY
     * ```typescript
     * {
     * "conteudo: "tweetar algo aqui",
     * "tipo: "Normal",
     * }
     * ```
     * 
     * @author Jessica 
     * 
     */
    public async criarTweet(content: string, tipo: TweetType, idUsuario: string): Promise<Result> {
        try {
            const tweet = new TweetModel(content, tipo); 
            const result = await repository.tweet.create({
                data: {
                    conteudo: tweet.conteudo,
                    tipo: tweet.tipo,
                    usuario: {
                        connect: {
                            id: idUsuario
                        }
                    }
                }
            });
            return {
                ok: true,
                code: 200,
                message: "Tweet criado com sucesso!",
                data: result
            };
        } catch (error: any) {
            return {
                ok: false,
                code: 500,
                message: error.toString(),
            };
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
            return {
                ok: false,
                code: 500,
                message: error.toString(),
            };
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
            return {
                ok: false,
                code: 500,
                message: error.toString(),
            };
        }
    }

    public async deletarTweet(id: string): Promise<Result> {
        try {
            const result = await repository.tweet.delete({
                where: {
                    id,
                },
            });

            return {
                ok: true,
                message: "Tweet deletado com sucesso!",
                code: 200,
                data: result,
            };

        } catch (error: any) {
            return {
                ok: false,
                code: 500,
                message: error.toString(),
            };
        }
    }
}
