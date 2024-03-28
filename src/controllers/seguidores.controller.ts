import { Request, Response } from "express";
import { erroServidor } from "../util/response.helper";
import { SeguidorService } from "../services/seguidores.service";

export class SeguidorController {
    private seguidorService: SeguidorService;

    constructor() {
        this.seguidorService = new SeguidorService();
    }

    public async seguirUsuario(req: Request, res: Response) {
        try {
            const result = await this.seguidorService.seguirUsuario(req, res);
            return res.status(201).send({
                ok: true,
                message: "Usuário seguido com sucesso!",
                data: result,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    public async listarSeguidores(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const seguidores = await this.seguidorService.listarSeguidores(id);
            return res.status(200).send({
                ok: true,
                message: "Seguidores encontrados com sucesso!",
                data: seguidores,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }
}
