import supertest from "supertest";
import { createApp } from "../../src/util/api.helper";

describe("Testes integrados para a criação de um usuário", () => {
    test("Deve retornar 404 caso nome não seja informado", async () => {
        const sut = createApp();

        const response = await supertest(sut).post("/usuario").send({
        
            email: "email",
            senha: "123456",
        });

        expect(response.status).toBe(404);
    });

});

