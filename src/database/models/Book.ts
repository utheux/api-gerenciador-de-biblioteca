import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('books')
export default class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
    description: string;

    constructor(name: string, description: string){
        this.name = name;
        this.description = description;
    }

}