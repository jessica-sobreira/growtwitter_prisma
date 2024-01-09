import { randomUUID } from "crypto";

export class ReplyModel {
    public id: string;
    constructor() {
        this.id = randomUUID(); 
    }
 }

 

