interface Observer {
    update(event: string, data: unknown): Promise<void>;
}

export default Observer;