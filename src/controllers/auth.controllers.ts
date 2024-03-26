// import { Request, Response } from "express";
// import { camposNaoInformados, erroServidor } from "../util/response.helper";
// import repository from "../database/prisma.repository";
// import { randomUUID } from "crypto";
// import jwt from "jsonwebtoken";
// import { authenticateToken } from "../middleware/auth.middleware"; // Importe o middleware aqui

// export class AuthController {

//     public async login(req: Request, res: Response) {
//         try {
//             const { email, senha } = req.body;

//             if(!email || !senha){
//                 return camposNaoInformados(res);
//             }

//             const usuario = await repository.usuario.findFirst({
//                 where: {
//                     email,
//                     senha,
//                 },
//                 select: {
//                     id: true,
//                     nome: true,
//                 },
//             });

//             if(!usuario){
//                 return res.status(401).send({
//                     ok: false,
//                     message: "Credenciais inválidas",
//                 });
//             }

//             const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });

//             await repository.usuario.update({
//                 where: {
//                     id: usuario.id,
//                 },
//                 data: {
//                     token,
//                 },
//             });

//             return res.status(200).send({
//                 ok: true,
//                 message: "Login realizado com sucesso!",
//                 data: {
//                     id: usuario.id,
//                     nome: usuario.nome,
//                     token,
//                 }
//             });
//         } 
//         catch(error: any) {
//             return erroServidor(res, error);
//         }
//     }

//     // Você pode usar o middleware aqui
//     public myProtectedRoute(req: Request, res: Response) {

//         return res.status(200).send({ ok: true, message: "Autenticado com sucesso!" });



//     }
// }

import { Request, Response } from "express";
import { camposNaoInformados, erroServidor } from "../util/response.helper";
import repository from "../database/prisma.repository";
import { randomUUID } from "crypto";
import { AuthService } from "../services/auth.service";
import { Result } from "../contracts/result.contract";

export class AuthController {

    public async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            if(!email || !senha){
                return camposNaoInformados(res);
            }

            const authService = new AuthService()
            const result: Result = await authService.login(email, senha)

            return res.status(Number(result.code)).send(result)

            }catch(error: any) {
            return erroServidor(res, error);
        }
    }
}

