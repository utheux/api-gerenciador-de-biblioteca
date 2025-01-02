import UserRepository from "../repositories/UserRepository";
import { Request, Response } from "express";

export default class AuthController {
    private userRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async login(req: Request, res: Response) {
            const {email, password} = req.body;
            const {success, acessToken, message} = await this.userRepository.login(email, password);

            if(success){
                return res.status(200).send(acessToken);
            } 

            res.status(401).send({message: message});
    }
}