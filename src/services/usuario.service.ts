import { Result } from "../contracts/result.contract";
import { CriarUsuarioDTO } from "../contracts/usuario.contract";
import repository from "../database/prisma.repository";
import { UsuarioModel } from "../models/usuario.model";

export class UsuarioService {
    public async criar(data: CriarUsuarioDTO): Promise<Result> {
        const resultValidacao = this.validarCamposCriar(data);
        if (!resultValidacao.ok) {
            return resultValidacao;
        }

        const usuario = new UsuarioModel(data.nome, data.email, data.senha);

        const result = await repository.usuario.create({
            data: usuario,
        });

        return {
            ok: true,
            message: "Usuário criado com sucesso",
            code: 201,
            data: result,
        };
    }

    private validarCamposCriar(data: CriarUsuarioDTO): Result {

        if (data.nome.length < 3) {
            return {
                ok: false,
                message: "O nome do usuário deve ter pelo menos 3 caracteres",
                code: 400,
            };
        }

        // if (!data.email.includes("@")) {
        //     return {
        //         ok: false,
        //         message: "E-mail informado é inválido",
        //         code: 400,
        //     };
        // }

        return {
            ok: true,
            code: 200,
            message: "Validação realizada com sucesso",
        };
    }
}