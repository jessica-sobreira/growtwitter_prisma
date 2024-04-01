import cors from "cors";
import express from "express";
import { usuarioRoutes } from "../routes/usuario.routes";
import { authRoutes } from "../routes/auth.routes";

export function createApp() {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/usuario", usuarioRoutes());
    app.use("/login", authRoutes());

    return app;
}