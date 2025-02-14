export default class IOError extends Error {
    constructor(message: string) {
        super(message);
        console.error(message);
        this.name = "Error";
    }
}