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

import swagger from "swagger-ui-express";
import swaggerJson from "./docs/swagger.json";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", usuarioRoutes()); 
app.use("/", authRoutes());
app.use("/", tweetRoutes());
app.use("/", likeRoutes());
app.use("/", seguidorRoutes());
app.use("/", replyRoutes());

app.use("/docs", swagger.serve);
app.use("/docs", swagger.setup(swaggerJson));

app.listen(process.env.PORT, () => {
    console.log("API está rodando!");
});
