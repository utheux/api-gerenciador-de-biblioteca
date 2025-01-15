import { Request, Response, NextFunction } from "express";

const checkAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Verifica se o usuário foi autenticado e tem o papel de 'admin'
    console.log(req.user)
    if (req.user && req.user.userRole === "admin") {
        return next(); // O usuário tem a role 'admin', então continua a requisição
    }

    // Caso contrário, retorna erro de acesso proibido
    return res.status(403).send('Access forbidden: Admins only');
}

export default checkAdminMiddleware;
