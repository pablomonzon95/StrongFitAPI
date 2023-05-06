import { Request} from "express";
import { JwtPayload } from "jsonwebtoken";

export default interface AuthRequest extends Request {
    auth?: string | JwtPayload;
}


export interface AuthPayload extends JwtPayload {
    id: string;
  }