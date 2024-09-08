declare namespace Express {
    export interface Request {
        user?: {
            username: string;
            sub: number; // sub is the user id
        }
    }
}