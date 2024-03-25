import { randomUUID } from "crypto";
import repository from "../database/prisma.repository";


export interface Result {
    ok: boolean;
    message: string;
    code: number;
    data?: any;
}


export class AuthService {

    public async login(email: string, senha: string): Promise<Result> {
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

        if(!usuario) {
            return {
                ok: false,
                message: "Credenciais inválidas",
                code: 401,
            }
    
        }

        const token = randomUUID()
        
        await repository.usuario.update({
            where: {
                id: usuario.id
            },
            data: {
                token

            }
        })


        return {
            ok: true,
            message: "Login realizado com sucesso",
            code: 200,
            data: {
                id: usuario.id,
                nome: usuario.nome,
                token
            } 
        }
    } 


}