import Observer from "./ObserverInterface";

interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(event: string, data: unknown): void;
}

export default Subject;