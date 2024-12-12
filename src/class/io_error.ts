export default class IOError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Error";
    }
}