import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";

export function authRoutes(){
    const router = Router({
        mergeParams: true,
    });

    const authController = new AuthController();

    //rota para autenticar
    router.post("/auth", authController.login);

    return router;
}