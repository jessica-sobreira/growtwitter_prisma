import { Router } from "express";
import { ReplyController } from "../controllers/reply.controller";


export function replyRoutes(){
    const router = Router({
        mergeParams: true,
    });

    const replyController = new ReplyController();


    router.post("/usuario/:id/reply/:idTweet", replyController.criarReply);


    return router;

    }