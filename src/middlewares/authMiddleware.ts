import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).send('Access token is missing');
    }

    const [, accessToken] = token.split(" "); // Bearer mirjfh8y489yhu3hogf3ugfuihiu

    const JWT_SECRET = process.env.JWT_SECRET as string;

    try {
        // Verifica a validade do token e decodifica o payload
        const decoded = jwt.verify(accessToken, JWT_SECRET) as jwt.JwtPayload;

        // Adiciona as informações decodificadas à requisição para uso em outras rotas
        req.user = {
            userId: decoded.userId,
            userRole: decoded.userRole,
            userEmail: decoded.userEmail
        };

        // Passa para o próximo middleware ou rota
        next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        // Se o token for inválido ou expirado
        return res.status(401).send('Invalid or expired token');
    }
}

export default authenticate;