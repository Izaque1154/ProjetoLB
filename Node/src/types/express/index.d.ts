import type { TokenPayload } from "../../interfaces/interfaceAuth";

declare global {
  namespace Express {
    export interface Request {
      user?: TokenPayload
    }
  }
}

export {};
