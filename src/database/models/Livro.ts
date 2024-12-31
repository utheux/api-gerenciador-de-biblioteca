import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity('livros')
export default class Livro {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @ManyToOne(()=> User, (user)=> user.livros)
    usuario!: User

    constructor(nome: string, descricao: string){
        this.nome = nome;
        this.descricao = descricao;
    }

}