import { Router } from "express";
import { LikeController } from "../controllers/like.controller";

export function likeRoutes(){
    const router = Router({
        mergeParams: true,
    });

    const likeController = new LikeController();

    router.post("/usuario/:id/like/:idTweet", likeController.darLike);
    router.delete("/usuario/:id/like/:idTweet", likeController.removerLike);

    return router;
}