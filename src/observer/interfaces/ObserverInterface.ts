interface Observer {
    update(event: string, data: unknown): void;
}

export default Observer;