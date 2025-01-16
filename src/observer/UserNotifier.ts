import DataSourceSingleton from "../database/DataSourceSingleton";
import User from "../database/models/User";
import Observer from "./interfaces/ObserverInterface";
import nodemailer from "nodemailer";

const myDataSource = DataSourceSingleton.getInstance();
const repository = myDataSource.getRepository(User)



class UserNotifier implements Observer {
    async update(event: string, data: unknown): Promise<void> {
        console.log(`Livro criado: ${event}:`, data);
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        } as nodemailer.TransportOptions)

        console.log("chegou aqui 1")
        const users: User[] = await repository.find({relations: ['role']});
        
        for (const user of users) {
            if(user.role && user.role.name === "admin"){
                console.log(`Enviando e-mail para: ${user.email}`); // Log de verificação
                    transporter.sendMail({
                    from: process.env.MAIL_FROM,
                    to: user.email,
                    subject: "envio de e-mail",
                    text: "livro criado com sucesso"})
            }

        }

        
}

}

export default UserNotifier;