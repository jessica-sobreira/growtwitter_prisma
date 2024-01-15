import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import { validarAcesso } from "./middlewares/usuario.middleware";
import { usuarioRoutes } from "./routes/usuario.routes";
import { tweetRoutes } from "./routes/tweet.routes";
import { likeRoutes } from "./routes/like.routes";
import { seguidorRoutes } from "./routes/seguidor.routes";
import { replyRoutes } from "./routes/reply.routes";
import { authRoutes } from "./routes/auth.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/usuario", usuarioRoutes());
app.use("/tweet", [validarAcesso], tweetRoutes());
app.use("/like", [validarAcesso], likeRoutes());
app.use("/seguidor", [validarAcesso], seguidorRoutes());
app.use("/reply", [validarAcesso], replyRoutes);
app.use("/auth", authRoutes());


app.listen(process.env.PORT, () => {
    console.log("API está rodando!");
    
});
