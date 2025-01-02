import UserRepository from "../repositories/UserRepository";
import { Request, Response } from "express";

class AuthController {
    private userRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async login(req: Request, res: Response) {
        const {email, senha} = req.body

        const {success, acessToken} = await this.userRepository.login(email, senha);

        return res.send(acessToken);
    }
}