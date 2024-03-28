import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";

export function authRoutes(){
    const router = Router({
        mergeParams: true,
    });

    const authController = new AuthController();

/**
 * Aqui é a rota para fazer o login. 
 * Precisa inserir email e senha no body.
 * @author Jessica
 */
    router.post("/login", authController.login);

    return router;
}