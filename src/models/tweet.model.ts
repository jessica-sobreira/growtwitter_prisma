import { randomUUID } from "crypto";

export class TweetModel {
    public id: string;
    constructor(
        public conteudo: string,
        public tipo: string,
    ) {
        this.id = randomUUID(); 
    }
 }

 

