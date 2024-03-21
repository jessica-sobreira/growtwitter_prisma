import { Router } from "express";
import { ReplyController } from "../controllers/reply.controller";
// import { validarAcesso } from "../middlewares/usuario.middleware";

export function replyRoutes(){
    const router = Router({
        mergeParams: true,
    });

    const replyController = new ReplyController();

    //rotas reply
    // router.post("/reply", [validarAcesso], replyController.criarReply);

    router.post("/reply", replyController.criarReply);

    return router;

    }