import { Repository } from "typeorm";
import User from "../database/models/User";
import InterfaceUserRepository from "./interfaces/InterfaceUserRepository";

export default class UserRepository implements InterfaceUserRepository{
    private repository;
    
    constructor(repository: Repository<User>){
        this.repository = repository;
    }

    async createUser(user: User){
        this.repository.save(user);
    }

    async userList(): Promise<User[]> {
        const userList = await this.repository.find();
        return userList;
    }

    async updateUser(id: number, newUser: User): Promise<{ success: boolean; message?: string; }> {
        try {
            const userToUpdate = await this.repository.findOne({where: {id}});

            if(!userToUpdate){
                return {success: false, message: "User not found!"};
            }
            Object.assign(userToUpdate, newUser);

            await this.repository.save(userToUpdate);

            return {success: true}         
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "There was an error updating user"
            };
        }
    }

    async deleteUser(id: number): Promise<{ success: boolean; message?: string; }> {
        try {
            const userToDelete = await this.repository.find({where: {id}});

            if(!userToDelete){
                return {success: false, message: "User not found!"};
            }
            
            await this.repository.remove(userToDelete);

            return {success: true};
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: "There was an error deleting user"
            };
        }
    }  
}