import Observer from "./interfaces/ObserverInterface";

class UserNotifier implements Observer {
    update(event: string, data: unknown): void {
        console.log(`Livro criado: ${event}:`, data);
        // Aqui você pode implementar a lógica adicional, como enviar notificações reais para os usuários
    }
}

export default UserNotifier;