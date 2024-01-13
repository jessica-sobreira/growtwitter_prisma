import express from "express";
import cors from "cors";

import { UsuarioController } from "./controllers/usuario.controller";
import { TweetController } from "./controllers/tweet.controller";

const app = express();
app.use(express.json());
app.use(cors());

const usuarioController = new UsuarioController();
const tweetController = new TweetController();


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


app.listen(3005, () => {
    console.log("API está rodando!");
    
});
