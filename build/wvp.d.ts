import intIdentifiers from "./interfaces/identifiers";
import { intOptions } from "./interfaces/options";
import Utils from "./class/utils";
import Styles from "./class/styles";
export declare class WVP {
    utils: Utils;
    styles: Styles;
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
    private init;
}
