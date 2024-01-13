import { Router } from "express";
import { LikeController } from "../controllers/like.controller";
import { validarAcesso } from "../middlewares/usuario.middleware";

export function likeRoutes(){
    const router = Router({
        mergeParams: true,
    });

    const likeController = new LikeController();

    // rotas likes
    router.post("/like", [validarAcesso], likeController.darLike);
    router.delete("/like/:idTweet/:idUsuario", [validarAcesso], likeController.removerLike);

    return router;

}