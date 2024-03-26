import { JwtPayload } from "jsonwebtoken";

export interface validarLoginDTO extends JwtPayload {
    id: string;
    nome: string;
 }