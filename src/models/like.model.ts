import { randomUUID } from "crypto";

export class LikeModel {
    public id: string;
    public idUsuario: string;
    public idTweet: string;

    constructor(idUsuario: string, idTweet: string) {
        this.id = randomUUID();
        this.idUsuario = idUsuario;
        this.idTweet = idTweet;
    }
}
