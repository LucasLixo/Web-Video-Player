export default class Utils {
    // ==================================================
    /**
     * hash
     */
    public hash(length: number): string {
        const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result: string = "";
        for (let i: number = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}