import Observer from "./interfaces/ObserverInterface";

class UserNotifier implements Observer {
    update(event: string, data: any): void {
        console.log(`UserNotifier received event: ${event} with data:`, data);
        // Aqui você pode implementar a lógica adicional, como enviar notificações reais para os usuários
    }
}

export default UserNotifier;