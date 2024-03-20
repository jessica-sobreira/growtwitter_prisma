import { randomUUID } from "crypto";

export class SeguidorModel {
    public id: string;
    public idUsuario: string;
    public idSeguido: string;

    constructor(idUsuario: string, idSeguido: string) {
        this.id = randomUUID();
        this.idUsuario = idUsuario;
        this.idSeguido = idSeguido;
    }
}
