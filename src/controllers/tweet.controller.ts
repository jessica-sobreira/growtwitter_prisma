import { Request, Response } from "express";
import { camposNaoInformados, erroServidor } from "../util/response.helper";
import { Result } from "../contracts/result.contract";
import { TweetService } from "../services/tweet.service";
import { TweetType } from "../models/tweet.model";

export class TweetController {

    public async criarTweet(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { conteudo, tipo } = req.body;

            if (!conteudo || !tipo) {
                return camposNaoInformados(res);
            }

            const tweetService = new TweetService();

            const result: Result = await tweetService.criarTweet(conteudo, tipo as TweetType, id);

            return res.status(result.code).send(result);

        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    public async listarTweets(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const tweetService = new TweetService();

            const result: Result = await tweetService.listarTweets(id); 

            return res.status(result.code).send(result);

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

            const tweetService = new TweetService();

            const result: Result = await tweetService.atualizarTweet(id, conteudo);

            return res.status(result.code).send(result);

        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    public async deletarTweet(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const tweetService = new TweetService();

            const result: Result = await tweetService.deletarTweet(id);

            return res.status(result.code).send(result);

        } catch (error: any) {
            return erroServidor(res, error);
        }
    }
}
