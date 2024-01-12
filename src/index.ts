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
app.post("/criar-usuario", usuarioController.criarUsuario);
app.get("/obter-usuario/:idUsuario", usuarioController.obterUsuario);
app.put("/atualizar-usuario", usuarioController.atualizarUsuario);
app.delete("/deletar-usuario/:idUsuario", usuarioController.deletarUsuario);
app.get("/listar-usuarios", usuarioController.listarUsuarios);

// rotas tweets
app.post("/criar-tweet", tweetController.criarTweet);
app.get("/usuario/:idUsuario/tweet", tweetController.listarTweets);
app.put("/atualizar-tweet/:idTweet", tweetController.atualizarTweet);


app.listen(3005, () => {
    console.log("API está rodando!");
    
});
