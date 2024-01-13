import { Request, Response } from "express";
import { camposNaoInformados, erroNaoEncontrado, erroServidor } from "../util/response.helper";
import repository from "../database/prisma.repository";
import { SeguidorModel } from "../models/seguidor.model";


export class SeguidorController {
    // Seguir um usuário
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

            // Verificar se o usuário a ser seguido existe
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

            const follower = new SeguidorModel(idSeguido);

            const result = await repository.seguidor.create({
                data: {
                    id: follower.id,
                    idUsuario: usuario.id,
                    idSeguido: follower.idSeguido,
                }
            });

            return res.status(201).send({
                ok: true,
                message: "Usuário seguido com sucesso!",
                data: result,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    // Listar seguidores de um usuário
    public async listarSeguidores(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const usuario = await repository.usuario.findUnique({
                where: {
                    id,
                },
                include: {
                    seguidores: true,
                },
            });

            if (!usuario) {
                return erroNaoEncontrado(res, "Usuario");
            }

            return res.status(200).send({
                ok: true,
                message: "Seguidores encontrados com sucesso!",
                data: usuario.seguidores,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

}
