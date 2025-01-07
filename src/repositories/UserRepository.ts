import { Repository } from "typeorm";
import User from "../database/models/User";
import InterfaceUserRepository from "./interfaces/InterfaceUserRepository";
import verifyPassword from "../services/verifyPasswordService";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import Role from "../database/models/Role";
dotenv.config();


export default class UserRepository implements InterfaceUserRepository{
    private userRepository;
    private roleRepository;
    
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>){
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    async createUser(user: User): Promise<void>{
        await this.userRepository.save(user);
    }

    async userList(): Promise<User[]> {
        const userList = await this.userRepository.find({relations: ['role']});
        return userList;
    }

    async updateUser(id: number, newUser: User): Promise<{ success: boolean; message?: string; }> {
        try {
            const userToUpdate = await this.userRepository.findOne({where: {id}});

            if(!userToUpdate){
                return {success: false, message: "User not found!"};
            }
            Object.assign(userToUpdate, newUser);

            await this.userRepository.save(userToUpdate);

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
            const userToDelete = await this.userRepository.find({where: {id}});

            if(!userToDelete){
                return {success: false, message: "User not found!"};
            }
            
            await this.userRepository.remove(userToDelete);

            return {success: true};
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: "There was an error deleting user"
            };
        }
    }  

    async login(email: string, password: string): Promise<{success: boolean; acessToken?: string, message?: string}> {
        const user = await this.userRepository.findOne({where: {email: email}});

        if(!user){
            return {success: false, message: "Email or password incorrect"}
        }

        const JWT_SECRET = process.env.JWT_SECRET as string;

        if(verifyPassword(password, user.password)){
            const payload = { userId: user.id, userRole: user.role, userEmail: user.email}; 
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); 
            return {success: true, acessToken: token};
        }

        return {success: false, message: "Email or password incorrect"};
    }

    async assignRoleToUser(userId: number, roleId: number): Promise<{success: boolean; message?: string}>{
        const user = await this.userRepository.findOne({where: {id: userId}});
        
        if(!user){
            return {success: false, message: "user not found"};
        }

        const role = await this.roleRepository.findOne({where: {id: roleId}});

        if(!role){
            return {success: false, message: "role not found"};
        }

        user.role = role;
        await this.userRepository.save(user);

        return {success: true}

    }

    
}