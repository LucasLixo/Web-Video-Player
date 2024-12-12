import intIdentifiers from "./interfaces/identifiers";
import { intOptions } from "./interfaces/options";
import Utils from "./class/utils";
export declare class WVP {
    utils: Utils;
    options: intOptions;
    identifiers: intIdentifiers;
    constructor(apply: string, options?: Record<string, any>);
    get colorInactive(): string;
    get colorActive(): string;
    get autoplay(): boolean;
    get muted(): boolean;
    set colorInactive(value: string);
    set colorActive(value: string);
    set autoplay(value: boolean);
    set muted(value: boolean);
}
