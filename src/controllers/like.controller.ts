import { Request, Response } from "express";
import { erroServidor, erroNaoEncontrado } from "../util/response.helper";
import { LikeService } from "../services/like.service";

export class LikeController {
    public likeService: LikeService;

    constructor() {
        this.likeService = new LikeService();
    }

    public async darLike(req: Request, res: Response) {
        try {
            const { idTweet, idUsuario } = req.params;
            const result = await this.likeService.darLike(idTweet, idUsuario);
            return res.status(201).send({
                ok: true,
                message: result,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    public async removerLike(req: Request, res: Response) {
        try {
            const { idTweet, idUsuario } = req.params;
            const result = await this.likeService.removerLike(idTweet, idUsuario);
            return res.status(200).send({
                ok: true,
                message: result,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }
}