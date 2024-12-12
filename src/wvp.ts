// Enum
import { reloaders } from "./enums/reloaders";
import { styles } from "./enums/styles";
// Interface
import intIdentifiers from "./interfaces/identifiers";
import intAspectRatio from "./interfaces/aspect_ratio";
import { intOptions } from "./interfaces/options"; "./interfaces/options";
// Functions
import Utils from "./class/utils";
// Class
import Controls from "./class/controls";
import Styles from "./class/styles";

// ==================================================
export class WVP {
    utils = new Utils();

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
            aspectRatio: {
                horizontal: parseInt((options['aspectRatio'] ?? '16:9').split(':')[0]),
                vertical: parseInt((options['aspectRatio'] ?? '16:9').split(':')[1]),
            },
            colorInactive: options['colorInactive'] ?? '#007AFF',
            colorActive: options['colorActive'] ?? '#FFFFFF',
            compatibility: options['compatibility'] ?? false,
            autoplay: options['autoplay'] ?? true,
            muted: options['muted'] ?? true,
        }
        this.identifiers = {
            styles: `styles-${this.utils.hash(18)}`,
            container: `container-${this.utils.hash(15)}`,
            buttonsTop: `top-${this.utils.hash(21)}`,
            buttonsMiddle: `middle-${this.utils.hash(18)}`,
            buttonsBottom: `bottom-${this.utils.hash(18)}`,
        };
        console.log(this.identifiers);
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
}
