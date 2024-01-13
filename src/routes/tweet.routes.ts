import { Router } from "express";
import { TweetController } from "../controllers/tweet.controller";
import { validarAcesso } from "../middlewares/usuario.middleware";

export function tweetRoutes(){
    const router = Router({
        mergeParams: true,
    });

    const tweetController = new TweetController();

    // rotas tweets
    router.post("/tweet", [validarAcesso], tweetController.criarTweet);
    router.get("/usuario/:id/tweet", [validarAcesso], tweetController.listarTweets);
    router.put("/tweet/:id", [validarAcesso], tweetController.atualizarTweet);
    router.delete("/tweet/:id", [validarAcesso], tweetController.deletarTweet);

    return router;

}