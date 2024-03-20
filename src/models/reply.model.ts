import { randomUUID } from "crypto";

export class ReplyModel {
    public id: string;
    public conteudo: string;
    public tweetOriginalId: string; 

    constructor(conteudo: string, tweetOriginalId: string) {
        this.id = randomUUID();
        this.conteudo = conteudo;
        this.tweetOriginalId = tweetOriginalId;
    }
}
