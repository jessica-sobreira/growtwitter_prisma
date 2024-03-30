import repository from "../database/prisma.repository";
import { Result } from "../contracts/result.contract";
import jwt from 'jsonwebtoken';
import { validarLoginDTO } from "../contracts/login.contract";


export class AuthService {

        /**
         * Realizar uma autenticação na API de login com email e senha.
         * 
            ```typescript
            const authService = new AuthService();
            const result = await authService({
                email: "bart@email.com",
                senha: "1234",
            });
        
            ```

         * @param email
         * @param senha
         * 
         * 
         * 
         * @author Jessica
         */

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

    public async validarLogin(token: string, idUsuario: string): Promise<Result> {

        const payload = this.validarToken(token) as validarLoginDTO

        if(payload == null || idUsuario != payload.id) {
            return {
                ok: false,
                message: "Token de autenticação inválido",
                code: 401
            }
            
        }

        return {
            ok: true,
            message: "Validação de login feita com sucesso!",
            code: 200
        }

    }

    public generateToken(payload: any) {
        const token = jwt.sign(payload, process.env.JWT_SECRET!) 
        return token

    }

    public validarToken(token: string) {
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET!)
            return payload 
        
        } catch(error: any) {
            return null
        }
    }


}