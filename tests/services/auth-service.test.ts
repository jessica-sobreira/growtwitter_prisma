import { AuthService } from "../../src/services/auth.service";

describe("Testes da classe AuthService", () => {
    test("deve retornar falha 401 quando o usuário não existe no banco de dados", async () => {
        const authService = new AuthService();
        authService.login = jest.fn().mockResolvedValue({
            code: 401,
            ok: false,
            message: "Credenciais inválidas",
        });

        const result = await authService.login("email", "senha");

        expect(result.code).toBe(401);
        expect(result.ok).toBe(false);
        expect(result.message).toBe("Credenciais inválidas");
    });

    test("deve retornar 200 quando o login for realizado com sucesso", async () => {

        const authService = new AuthService();
        authService.login = jest.fn().mockResolvedValue({
            code: 200,
            ok: true,
            message: "Login realizado com sucesso",
        });

        const result = await authService.login("bart@email.com", "1234");

        
        expect(result.code).toBe(200);
        expect(result.ok).toBe(true);
        expect(result.message).toBe("Login realizado com sucesso");
    });
});
