import { Request, Response } from "express";
import { erroServidor } from "../util/response.helper";
import { ReplyService } from "../services/reply.service";

export class ReplyController {
    public replyService: ReplyService;

    constructor() {
        this.replyService = new ReplyService();
    }

    public async criarReply(req: Request, res: Response) {
        try {
            const result = await this.replyService.criarReply(req, res);
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
            const replies = await this.replyService.listarReplies(id);
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
            await this.replyService.deletarReply(id);
            return res.status(200).send({
                ok: true,
                message: "Reply deletado com sucesso!",
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }
}