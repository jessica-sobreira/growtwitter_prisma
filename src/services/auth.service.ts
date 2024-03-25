import repository from "../database/prisma.repository";

export class AuthService {

    public async login(email: string, senha: string) {
        const usuario = await repository.usuario.findFirst({
            where: {
                email,
                senha
            },
            select: {
                id: true,
                nome: true
            }
        })
    } 

}