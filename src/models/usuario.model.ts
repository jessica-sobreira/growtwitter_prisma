import { randomUUID } from "crypto";

export class UsuarioModel {
    public id: string;

    constructor(
        public nome: string,
        public email: string,
        public senha: string,
        public token?: string,
    ) {
        this.id = randomUUID(); 
    }
}
