import Observer from "./interfaces/ObserverInterface";
import Subject from "./interfaces/SubjectInterface";


class BookNotifier implements Subject {
    private observers: Observer[] = [];

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    async notify(event: string, data: unknown): Promise<void> {
        for (const observer of this.observers) {
            await observer.update(event, data);
        }
    }
}

export default BookNotifier;