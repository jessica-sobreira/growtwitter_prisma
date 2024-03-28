import { Router } from "express";
import { SeguidorController } from "../controllers/seguidores.controller";


export function seguidorRoutes(){
    const router = Router({
        mergeParams: true,
    });

    const seguidorController = new SeguidorController();


    router.post("/usuario/:id/seguir/:id", seguidorController.seguirUsuario);
    router.get("/usuario/:id/seguidores/:id", seguidorController.listarSeguidores);

    return router;
}