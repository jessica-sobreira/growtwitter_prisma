import { Router } from "express";
import { SeguidorController } from "../controllers/seguidores.controller";
// import { validarAcesso } from "../middlewares/usuario.middleware";

export function seguidorRoutes(){
    const router = Router({
        mergeParams: true,
    });

    const seguidorController = new SeguidorController();

    //rotas seguidores
    // router.post("/seguidor", [validarAcesso], seguidorController.seguirUsuario);
    // router.get("/seguidores/:id", [validarAcesso], seguidorController.listarSeguidores);

    router.post("/seguidor", seguidorController.seguirUsuario);
    router.get("/seguidores/:id", seguidorController.listarSeguidores);




    return router;

}