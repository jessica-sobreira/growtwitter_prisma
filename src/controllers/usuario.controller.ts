import { Request, Response } from "express";
import { UsuarioService } from "../services/usuario.service";
import repository from "../database/prisma.repository";



export class UsuarioController {

    /**
     * Rota para criar o usuário.
     * Colocar no body nome, email e senha.
     * 
     * 
     * @author Jessica
     */

    public async criarUsuario(req: Request, res: Response) {
        try {
            const { nome, email, senha } = req.body;

            if (!nome) {
                return res.status(400).send({
                    ok: false,
                    message: "Nome não foi informado",
                });
            }


            const usuarioService = new UsuarioService();

            /**
             * Informações que precisam ser inseridas no body.
             * 
             * @author Jessica
             * 
             */

            const result = await usuarioService.criar({
                nome,
                email,
                senha,
            });

            return res.status(201).send(result);
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    // Obter um usuario pelo ID
    public async obterUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const usuario = await repository.usuario.findUnique({
                where: {
                    id,
                },
            })

            if (!usuario) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuário não encontrado",
                });
            }

            return res.status(200).send({
                ok: true,
                message: "Usuário obtido com sucesso",
                data: usuario,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    // Atualizar um usuário
    public async atualizarUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome } = req.body;

            if (!nome) {
                return res.status(400).send({
                    ok: false,
                    message: "Informe o campo para atualizar",
                });
            }

            const result = await repository.usuario.update({
                where: {
                    id,
                },
                data: {
                    nome,
                },
            })

            return res.status(200).send({
                ok: true,
                message: "Usuário atualizado com sucesso",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    // Deletar um usuario
    public async deletarUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const usuario = await repository.usuario.findUnique({
                where: {
                    id,
                },
            })

            if(!usuario) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuário não encontrado",
                })
            }

            await repository.usuario.delete({
                where: {
                    id,
                },
            })

            return res.status(200).send({
                ok: true,
                message: "Usuário deletado com sucesso",
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    // Listar todos os usuário
    public async listarUsuarios(req: Request, res: Response) {
        try {
            const result = await repository.usuario.findMany();

            return res.status(200).send({
                ok: true,
                message: "Usuários listados com sucesso",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
