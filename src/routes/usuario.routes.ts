import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { validaMiddlewareLogin } from "../middlewares/login.middleware";

export function usuarioRoutes(){
    const router = Router({
        mergeParams: true,
    });

    const usuarioController = new UsuarioController();

    // Rotas de usuário
    router.post("/usuario", usuarioController.criarUsuario);
    router.get("/:id", usuarioController.obterUsuario);
    router.put("/:id", [validaMiddlewareLogin], usuarioController.atualizarUsuario);
    router.delete("/:id", [validaMiddlewareLogin], usuarioController.deletarUsuario);
    router.get("/", usuarioController.listarUsuarios);
    
    return router;
}
