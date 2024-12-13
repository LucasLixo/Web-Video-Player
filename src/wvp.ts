// Enums
import { styles } from "./enums/styles";
// Interfaces
import intIdentifiers from "./interfaces/identifiers";
import { intOptions } from "./interfaces/options"; "./interfaces/options";
// Class
import IOError from "./class/io_error";
import Elements from "./class/elements";
import Styles from "./class/styles";

// ==================================================
class WVP {
    styles: Styles;
    elements: Elements;

    // ==================================================
    options: intOptions;
    identifiers: intIdentifiers;

    // ==================================================
    constructor(apply: string, options?: Record<string, any>) {
        if (options == undefined) {
            options = {};
        }
        this.options = {
            apply: apply,
            colorInactive: options['colorInactive'] ?? '#FFFFFF',
            colorActive: options['colorActive'] ?? '#007AFF',
            autoplay: options['autoplay'] ?? true,
            muted: options['muted'] ?? true,
        }
        this.identifiers = {
            all: 'wvp_all',
            video: apply,
            container: 'wvp__container',
            top: 'wvp__top',
            middle: 'wvp__middle',
            bottom: 'wvp__bottom',
            icons: 'wvp__icon',
        };
        this.styles = new Styles(this.options, this.identifiers);
        this.elements = new Elements(this.options, this.identifiers);
        this.init();
    }

    // ==================================================
    // Getters
    get colorInactive(): string {
        return this.options.colorInactive;
    }
    get colorActive(): string {
        return this.options.colorActive;
    }
    get autoplay(): boolean {
        return this.options.autoplay;
    }
    get muted(): boolean {
        return this.options.muted;
    }

    // ==================================================
    // Setters
    set colorInactive(value: string) {
        if (this.options.colorInactive == value) return;
        this.options.colorInactive = value;
    }
    set colorActive(value: string) {
        if (this.options.colorActive == value) return;
        this.options.colorActive = value;
    }
    set autoplay(value: boolean) {
        if (this.options.autoplay == value) return;
        this.options.autoplay = value;
    }
    set muted(value: boolean) {
        if (this.options.muted == value) return;
        this.options.muted = value;
    }

    // ==================================================
    private init() {
        this.styles.build();
    }
}
