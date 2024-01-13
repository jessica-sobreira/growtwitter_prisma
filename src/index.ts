import express from "express";
import cors from "cors";

import { AuthController } from "./controllers/auth.controllers";
import { LikeController } from "./controllers/like.controller";
import { SeguidorController } from "./controllers/seguidores.controller";
import { validarAcesso } from "./middlewares/usuario.middleware";
import { usuarioRoutes } from "./routes/usuario.routes";
import { tweetRoutes } from "./routes/tweet.routes";

const app = express();
app.use(express.json());
app.use(cors());


const authController = new AuthController();
const likeController = new LikeController();
const seguidorController = new SeguidorController();

app.use("/usuario", usuarioRoutes());
app.use("/tweet", [validarAcesso], tweetRoutes());

// rotas likes
app.post("/like", [validarAcesso], likeController.darLike);
app.delete("/like/:idTweet/:idUsuario", [validarAcesso], likeController.removerLike);

//rotas seguidores
app.post("/seguidor", [validarAcesso], seguidorController.seguirUsuario);
app.get("/seguidores/:id", [validarAcesso], seguidorController.listarSeguidores);


//rota para autenticar
app.post("/login", authController.login);

app.listen(3005, () => {
    console.log("API está rodando!");
    
});
