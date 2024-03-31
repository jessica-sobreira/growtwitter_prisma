class Calculadora {
    public somar(a: number, b: number) {
        return a + b;
    }
}

describe("Testes da classe Calculadora", () => {
    test("deve somar dois números quando for informado dois números", () => {
        const calculadora = new Calculadora();
        const result = calculadora.somar(1, 2);
        expect(result).toBeDefined();
        expect(result).toBe(3);
        expect(result).toBeGreaterThan(0);
    });
});
