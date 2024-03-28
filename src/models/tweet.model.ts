import { randomUUID } from "crypto";

export enum TweetType {
    'Normal' = 'Normal',
    'Reply' = 'Reply',
}

export class TweetModel {
    public id: string;

    constructor(
        public conteudo: string,
        public tipo: TweetType,

    ) {
        this.id = randomUUID(); 
    }
}
