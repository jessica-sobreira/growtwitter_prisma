import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import { usuarioRoutes } from "./routes/usuario.routes";
import { tweetRoutes } from "./routes/tweet.routes";
import { likeRoutes } from "./routes/like.routes";
import { seguidorRoutes } from "./routes/seguidor.routes";
import { replyRoutes } from "./routes/reply.routes";
import { authRoutes } from "./routes/auth.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", usuarioRoutes()); 
app.use("/", authRoutes());
app.use("/tweet", tweetRoutes());
app.use("/like", likeRoutes());
app.use("/seguidor", seguidorRoutes());
app.use("/reply", replyRoutes());

app.listen(process.env.PORT, () => {
    console.log("API está rodando!");
});
