import { Request, Response } from "express";
import { camposNaoInformados, erroServidor } from "../util/response.helper";
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

