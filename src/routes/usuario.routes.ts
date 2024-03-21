import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

export function usuarioRoutes(){
    const router = Router({
        mergeParams: true,
    });

    const usuarioController = new UsuarioController();

    // Rotas de usuário
    router.post("/usuario", usuarioController.criarUsuario);
    router.get("/:id", usuarioController.obterUsuario);
    router.put("/:id", usuarioController.atualizarUsuario);
    router.delete("/:id", usuarioController.deletarUsuario);
    router.get("/", usuarioController.listarUsuarios);
    
    return router;
}
