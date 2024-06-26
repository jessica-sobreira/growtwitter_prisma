import { AuthService } from "../../src/services/auth.service";

describe("Testes da classe AuthService", () => {

    test("deve retornar falha 401 quando o usuário não existe no banco de dados", async () => {
        const authService = new AuthService();
        const result = await authService.login("email", "senha");

        expect(result.code).toBe(401);
        expect(result.ok).toBe(false);
        expect(result.message).toBe("Credenciais inválidas");
    });


})