import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity("roles")
export default class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(()=> User, (user)=> user.role)
    users!: User;

    constructor(name: string, description: string){
        this.name = name;
        this.description = description;
    }


}