import { UsuarioModel as UsuarioBackend, UsuarioModel } from "../models/usuario.model";

export function adaptUsuarioPrisma(usuario: UsuarioModel): UsuarioBackend {

    const novoUsuario = new UsuarioBackend(
        usuario.id,
        usuario.nome,
        usuario.email,

    );

    novoUsuario.id = usuario.id;

    return novoUsuario;

}