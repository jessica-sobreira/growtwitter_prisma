import express from "express";
import cors from "cors";

import { UsuarioController } from "./controllers/usuario.controller";
import { TweetController } from "./controllers/tweet.controller";
import { AuthController } from "./controllers/auth.controllers";
import { LikeController } from "./controllers/like.controller";

const app = express();
app.use(express.json());
app.use(cors());

const usuarioController = new UsuarioController();
const tweetController = new TweetController();
const authController = new AuthController();
const likeController = new LikeController();

//rotas usuario
app.post("/usuario", usuarioController.criarUsuario);
app.get("/usuario/:id", usuarioController.obterUsuario);
app.put("/usuario", usuarioController.atualizarUsuario);
app.delete("/usuario/:id", usuarioController.deletarUsuario);
app.get("/usuarios", usuarioController.listarUsuarios);

// rotas tweets
app.post("/tweet", tweetController.criarTweet);
app.get("/usuario/:id/tweet", tweetController.listarTweets);
app.put("/tweet/:id", tweetController.atualizarTweet);
app.delete("/tweet/:id", tweetController.deletarTweet);

// rotas likes
app.post("/like", likeController.darLike);
app.delete("/like/:idTweet/:idUsuario", likeController.removerLike);

//rota para autenticar
app.post("/login", authController.login);

app.listen(3005, () => {
    console.log("API está rodando!");
    
});
