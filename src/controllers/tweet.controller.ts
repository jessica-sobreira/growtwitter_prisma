import { Request, Response } from "express";
import { camposNaoInformados, erroNaoEncontrado, erroServidor } from "../util/response.helper";
import repository from "../database/prisma.repository";
import { TweetModel } from "../models/tweet.model";



export class TweetController {
    public async criarTweet(req: Request, res: Response) {
        try{
            const { idTweet } = req.params;
            const { conteudo, tipo } = req.body;
            const { authorization } = req.headers;

            if(!conteudo || !tipo){
                return camposNaoInformados(res);
            }

            if(!authorization){
                return res.status(401).send({
                    ok: false,
                    message: "Token de autenticação ausente",
                });
            }

            const usuarioExiste = await repository.usuario.findUnique({
                where: {
                    idUsuario: authorization,
                },
            });

            if(!usuarioExiste){
                return erroNaoEncontrado(res, "Aluno");
            }

            const tweet = new TweetModel(conteudo, tipo);

            const result = await repository.tweet.create({
                data: {
                    idTweet: tweet.id,
                    conteudo: tweet.conteudo,
                    tipo: tweet.tipo,
                    idUsuario: authorization,
                }
            });

            return res.status(201).send({
                ok: true,
                message: "Tweet criado com sucesso!",
                data: result
            });
        }
        catch(error: any) {
            return erroServidor(res, error);
        }
    }

    //listar tweets de um usuario
    public async listarTweets(req: Request, res: Response) {
        try{
            const { idUsuario } = req.params;

            const usuario = await repository.usuario.findUnique({
                where: {
                    idUsuario,
                },
                include: {
                    tweets: true,
                },
            });
            
            if(!usuario){
                return erroNaoEncontrado(res, "Usuario");
            }

            return res.status(200).send({
                ok: true,
                message: "Tweets encontrados com sucesso!",
                data: usuario.tweets,
            });
        }
        catch(error: any) {
            return erroServidor(res, error);
        }
    }

    //atualizar tweet
    public async atualizarTweet(req: Request, res: Response) {
        try{
            const { idUsuario, idTweet } = req.params;
            const { conteudo } = req.body;

            const usuario = await repository.usuario.findUnique({
                where: {
                    idUsuario,
                },
            });

            if(!usuario){
                return erroNaoEncontrado(res, "Usuario");
            }

            if(!conteudo){
                return camposNaoInformados(res);
            }

            const tweet = await repository.tweet.findUnique({
                where: {
                    idTweet,
                },
            });

            if(!tweet){
                return erroNaoEncontrado(res, "Tweet");
            }

            const result = await repository.tweet.update({
                where: {
                    idTweet,
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
        }
        catch(error: any) {
            return erroServidor(res, error);
        }
    }

    //deletar tweet
    
}
