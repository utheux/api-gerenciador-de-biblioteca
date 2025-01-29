import { Request, Response } from "express";
import User from "../database/models/User";
import UserRepository from "../repositories/UserRepository";
import hashPasswordService from "../services/hashPasswordService";


export default class UserController {
    private userRepository;


    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async createUser(req: Request, res: Response){
        const {name, lastName, email, cellphone, password, photo} = req.body as User;
        const hashedPassword = hashPasswordService(password);
        
        const newUser = new User(name, lastName, email, cellphone, hashedPassword, photo);

        await this.userRepository.createUser(newUser);

        return res.status(201).json({id: newUser.id, name, lastName, email})

    }

    async listUsers(req: Request, res: Response){
        const listUsers = await this.userRepository.userList();

        return res.status(200).json(listUsers);
    }

    async updateUser(req: Request, res: Response){
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...updateData } = req.body as Partial<User>; // Remove a senha
        const userId = req.user?.userId;


        const {success, message} = await this.userRepository.updateUser(Number(userId), updateData);

        if(!success){
            res.status(404).json({error: message});
        }

        return res.sendStatus(204);
    }

    async deleteUser(req: Request, res: Response){
        const userId = req.user?.userId;

        const {success, message} = await this.userRepository.deleteUser(Number(userId));

        if(!success){
            return res.status(404).json({error: message});
        }

        return res.sendStatus(204)
    }

    async assignRoleToUser(req: Request, res: Response){
        const {userId, roleId} = req.params;

        const {success, message} = await this.userRepository.assignRoleToUser(Number(userId), Number(roleId));

        if(!success){
            return res.status(404).json({error: message});
        }

        return res.sendStatus(204);
    }
}