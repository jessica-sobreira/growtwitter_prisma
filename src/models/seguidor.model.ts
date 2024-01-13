import { randomUUID } from "crypto";

export class SeguidorModel {
    public id: string;
    public idSeguido: string;

    constructor(idSeguido: string) {
        this.id = randomUUID();
        this.idSeguido = idSeguido;
    }
}
