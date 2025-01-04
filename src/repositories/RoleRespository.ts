import { Repository } from "typeorm";
import Role from "../database/models/Role";
import InterfaceRoleRepository from "./interfaces/InterfaceRoleRepository";

export default class RoleRepository implements InterfaceRoleRepository {
    private roleRepository;

    constructor(repository: Repository<Role>){
        this.roleRepository = repository;
    }
    
    async createRole(role: Role){
        const roleCreated = await this.roleRepository.save(role);
        return roleCreated;
    }
    
    async rolelist(): Promise<Role[]> {
        const roleList = await this.roleRepository.find();
        return roleList;
    }
  


}