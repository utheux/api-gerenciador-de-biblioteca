import Role from "../database/models/Role";
import RoleRepository from "../repositories/RoleRespository";
import { Request, Response } from "express";

export default class RoleController {
    private roleRepository;

    constructor(repository: RoleRepository){
        this.roleRepository = repository;
    }

    async createRole(req: Request, res: Response){
        const {name, description} = req.body;
        const role = new Role(name, description);
        await this.roleRepository.createRole(role);

        return res.status(201).json({id: role.id, name, description});
    }

    async roleList(req: Request, res: Response){
        const roleList = await this.roleRepository.rolelist();

        return res.status(200).json(roleList);
    }
}