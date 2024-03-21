import { Request, Response } from "express";
import { camposNaoInformados, erroNaoEncontrado, erroServidor } from "../util/response.helper";
import { UsuarioModel } from "../models/usuario.model";
import repository from "../database/prisma.repository";


export class UsuarioController {
    public async criarUsuario(req: Request, res: Response) {
        try{
            const { nome, email, senha } = req.body;

            if(!nome || !email || !senha){
                return camposNaoInformados(res);
            }

            const usuario = new UsuarioModel(nome, email, senha);

            const result = await repository.usuario.create({
                data: usuario,
            });

            return res.status(201).send({
                ok: true,
                message: "Usuário criado com sucesso!",
                data: result
            });       
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    public async obterUsuario(req: Request, res: Response) {
        try{
            const { id } = req.params;

            const usuarioID = await repository.usuario.findUnique({
                where: {
                    id,
                },
            });

            if(!usuarioID){
                return erroNaoEncontrado(res, "Usuario");
            }

            return res.status(200).send({
                ok: true,
                message: "Usuário encontrado com sucesso!",
                data: usuarioID
            });
        }
        catch(error: any) {
            return erroServidor(res, error);
        }
    }


    public async atualizarUsuario(req: Request, res: Response) {
        try{
            const { id } = req.params;
            const { nome } = req.body;

            if( !nome ){
                return res.status(400).send({
                    ok: false,
                    message: "Informe um campo para atualizar",
                });
            }

            const usuarioExiste = await repository.usuario.findUnique({
                where: {
                    id,
                },
            });

            if(!usuarioExiste){
                return erroNaoEncontrado(res, "Usuario");
            }

            const result = await repository.usuario.update({
                where: {
                    id,
                },
                data: {
                    nome,
                },
            });

            return res.status(200).send({
                ok: true,
                message: "Usuário atualizado com sucesso!",
                data: result,
            });
        }
        catch(error: any) {
            return erroServidor(res, error);
        }
    }

    public async deletarUsuario(req: Request, res: Response) {
        try{
            const { id } = req.params;

            const usuarioExiste = await repository.usuario.findUnique({
                where: {
                    id,
                },
            });

            if(!usuarioExiste){
                return erroNaoEncontrado(res, "Usuario");
            }

            await repository.usuario.delete({
                where: {
                    id,
                },
            });
            return res.status(200).send({
                ok: true,
                message: "Usuário deletado com sucesso!",
            });
        }
        catch(error: any) {
            return erroServidor(res, error);
        }
    }


    public async listarUsuarios(req: Request, res: Response) {
        try {
            const usuarios = await repository.usuario.findMany();

            return res.status(200).send({
                ok: true,
                message: "Todos os usuários",
                data: usuarios,
            });

        } catch (error: any) {
            return erroServidor(res, error);
        }
    }
}
