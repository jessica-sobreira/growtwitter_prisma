import express from "express";
import cors from "cors";

import { AuthController } from "./controllers/auth.controllers";
import { validarAcesso } from "./middlewares/usuario.middleware";
import { usuarioRoutes } from "./routes/usuario.routes";
import { tweetRoutes } from "./routes/tweet.routes";
import { likeRoutes } from "./routes/like.routes";
import { seguidorRoutes } from "./routes/seguidor.routes";
import { replyRoutes } from "./routes/reply.routes";

const app = express();
app.use(express.json());
app.use(cors());


const authController = new AuthController();


app.use("/usuario", usuarioRoutes());
app.use("/tweet", [validarAcesso], tweetRoutes());
app.use("/like", [validarAcesso], likeRoutes());
app.use("/seguidor", [validarAcesso], seguidorRoutes());
app.use("/reply", [validarAcesso], replyRoutes);


//rota para autenticar
app.post("/login", authController.login);

app.listen(3005, () => {
    console.log("API está rodando!");
    
});
