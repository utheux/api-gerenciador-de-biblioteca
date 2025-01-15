interface Observer {
    update(event: string, data: any): void;
}

export default Observer;