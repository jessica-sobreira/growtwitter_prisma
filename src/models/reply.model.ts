import { randomUUID } from "crypto";

export class ReplyModel {
    public id: string;
    public conteudo: string;
    public idTweetOriginal: string;

    constructor(conteudo: string, idTweetOriginal: string) {
        this.id = randomUUID();
        this.conteudo = conteudo;
        this.idTweetOriginal = idTweetOriginal;
    }
}
