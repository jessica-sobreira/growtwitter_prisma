import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { validaMiddlewareLogin } from "../middlewares/login.middleware";

export function usuarioRoutes(){
    const router = Router({
        mergeParams: true,
    });

    const usuarioController = new UsuarioController();

    /**
     * No Growtwitter, esta é a rota para criar um usuário. 
     * Precisa inserir nome, email e senha no body.
     * @author Jessica
     * 
     */
    router.post("/usuario", usuarioController.criarUsuario);
    router.get("/:id", usuarioController.obterUsuario);
    router.put("/:id", [validaMiddlewareLogin], usuarioController.atualizarUsuario);
    router.delete("/:id", [validaMiddlewareLogin], usuarioController.deletarUsuario);
    router.get("/", usuarioController.listarUsuarios);
    
    return router;
}
