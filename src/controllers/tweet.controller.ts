import { Request, Response } from "express";
import { camposNaoInformados, erroServidor } from "../util/response.helper";
import { Result } from "../contracts/result.contract";
import { TweetService } from "../services/tweet.service";

export class TweetController {

    public tweetService: TweetService;

    constructor() {
        this.tweetService = new TweetService();
    }

    public async criarTweet(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { conteudo, tipo } = req.body;

            if (!conteudo || !tipo) {
                return camposNaoInformados(res);
            }

            const result: Result = await this.tweetService.criarTweet(conteudo, tipo);

            return res.status(Number(result.code)).send(result);

        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    public async listarTweets(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const result: Result = await this.tweetService.listarTweets(id);

            return res.status(Number(result.code)).send(result);

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

            const result: Result = await this.tweetService.atualizarTweet(id, conteudo);

            return res.status(Number(result.code)).send(result);

        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    public async deletarTweet(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const result: Result = await this.tweetService.deletarTweet(id);

            return res.status(Number(result.code)).send(result);

        } catch (error: any) {
            return erroServidor(res, error);
        }
    }
}
