import { Repository } from "typeorm";
import Role from "../database/models/Role";
import InterfaceRoleRepository from "./interfaces/InterfaceRoleRepository";

export default class RoleRepository implements InterfaceRoleRepository {
    private repository;

    constructor(repository: Repository<Role>){
        this.repository = repository;
    }
    
    async createRole(role: Role){
        const roleCreated = await this.repository.save(role);
        return roleCreated;
    }
    
    async rolelist(): Promise<Role[]> {
        const roleList = await this.repository.find();
        return roleList;
    }
  


}