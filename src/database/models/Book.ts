import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('books')
export default class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column()
    author: string

    @Column()
    status: boolean;

    constructor(name: string, description: string, author: string){
        this.name = name;
        this.description = description;
        this.status = true;
        this.author = author;
    }

}