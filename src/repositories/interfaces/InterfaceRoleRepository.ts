import Role from "../../database/models/Role";

export default interface InterfaceRoleRepository{
    createRole(role: Role): Promise<Role>;
    rolelist(): Promise<Role[]>;
}