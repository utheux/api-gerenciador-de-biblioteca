import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('enderecos')
export default class Endereco{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    cidade: string;

    @Column()
    estado: string;

    @Column()
    rua: string;

    @Column()
    numero: string;

    @Column()
    setor: string;

    constructor(cidade: string, estado: string, rua: string, numero: string, setor: string){
        this.cidade = cidade;
        this.estado = estado;
        this.rua = rua;
        this.numero = numero;
        this.setor = setor;
    }

}