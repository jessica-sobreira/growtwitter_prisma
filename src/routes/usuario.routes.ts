import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

export function usuarioRoutes(){
    const router = Router({
        mergeParams: true,
    });

    const usuarioController = new UsuarioController();

    //rotas usuario
    router.post("/usuario", usuarioController.criarUsuario);
    router.get("/usuario/:id", usuarioController.obterUsuario);
    router.put("/usuario", usuarioController.atualizarUsuario);
    router.delete("/usuario/:id", usuarioController.deletarUsuario);
    router.get("/usuarios", usuarioController.listarUsuarios);

    return router;


}