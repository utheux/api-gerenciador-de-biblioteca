import Observer from "./interfaces/ObserverInterface";
import nodemailer from "nodemailer";

class UserNotifier implements Observer {
    update(event: string, data: unknown): void {
        console.log(`Livro criado: ${event}:`, data);
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        } as nodemailer.TransportOptions)

        transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: "utheuz_ribeiro@hotmail.com",
            subject: "envio de e-mail",
            text: "livro criado com sucesso"})
}

}

export default UserNotifier;