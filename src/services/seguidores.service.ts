import { Request, Response } from "express";
import { camposNaoInformados, erroNaoEncontrado, erroServidor } from "../util/response.helper";
import repository from "../database/prisma.repository";
import { SeguidorModel } from "../models/seguidor.model";

export class SeguidorService {

    public async seguirUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { idSeguido } = req.body;
            const { authorization } = req.headers;

            if (!idSeguido) {
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

            const usuarioSeguido = await repository.usuario.findUnique({
                where: {
                    id: idSeguido,
                },
            });

            if (!usuarioSeguido) {
                return erroNaoEncontrado(res, "Usuario Seguido");
            }

            if (usuario.id === idSeguido) {
                return res.status(400).send({
                    ok: false,
                    message: "Um usuário não pode seguir a si mesmo",
                });
            }

            const seguidor = new SeguidorModel(idSeguido, id);

            const result = await repository.seguidor.create({
                data: {
                    id: seguidor.id,
                    idUsuario: usuario.id,
                    idSeguido: seguidor.idSeguido,
                }
            });

            return result;
        } catch (error: any) {
            throw error;
        }
    }

    public async listarSeguidores(id: string) {
        try {
            const usuario = await repository.usuario.findUnique({
                where: {
                    id,
                },
                include: {
                    seguidores: true,
                },
            });

            if (!usuario) {
                throw new Error("Usuário não encontrado");
            }

            return usuario.seguidores;
        } catch (error: any) {
            throw error;
        }
    }

}
