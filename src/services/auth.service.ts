import { randomUUID } from "crypto";
import repository from "../database/prisma.repository";
import { Result } from "../contracts/result.contract";
import jwt from 'jsonwebtoken';


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

        const token = this.generateToken(usuario)




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

    public generateToken(payload: any) {
        const token = jwt.sign(payload, process.env.JWT_SECRET!) 
        return token

    }


}