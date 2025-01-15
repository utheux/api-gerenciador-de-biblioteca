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

    notify(event: string, data: any): void {
        for (const observer of this.observers) {
            observer.update(event, data);
        }
    }
}

export default BookNotifier;