import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity("roles")
export default class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @OneToMany(()=> User, (user)=> user.role)
    users!: User;

    constructor(nome: string, descricao: string){
        this.nome = nome;
        this.descricao = descricao;
    }


}