import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Endereco from './Endereco';
import Livro from './Livro';
import Role from './Role';

@Entity('users')
export default class User{
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    nome: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    celular: string;

    @Column()
    senha: string;

    @Column()
    foto?:string;

    @OneToOne(()=> Endereco, {
        nullable: true,
        cascade: true,
        eager: true
    })
    @JoinColumn()
    endereco?: Endereco

    @OneToMany(()=> Livro, (livro) => livro.usuario)
    livros!: Livro[]

    @ManyToOne(()=> Role, (role)=> role.users)
    role!: Role
    

    constructor(nome: string, lastName: string, email: string, celular: string, senha: string, foto?: string, endereco?: Endereco){
        this.nome = nome;
        this.lastName = lastName;
        this.email = email = email;
        this.celular = celular;
        this.senha = senha;
        this.foto = foto;
        this.endereco = endereco;
    }
}
