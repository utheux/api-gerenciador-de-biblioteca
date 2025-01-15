import Observer from "./ObserverInterface";

interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(event: string, data: any): void;
}

export default Subject;