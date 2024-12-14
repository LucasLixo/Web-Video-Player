// Interfaces
import intIdentifiersId from "./interfaces/identifiers_id";
import intIdentifiersClass from "./interfaces/identifiers_class";
import intActions from "./interfaces/actions";
import intOptions from "./interfaces/options";
// Class
import IOError from "./class/io_error";
import Elements from "./class/elements";
import Styles from "./class/styles";

class WVP {
    // ==================================================
    // Interfaces
    options: intOptions;
    identifiersId: intIdentifiersId;
    identifiersClass: intIdentifiersClass;
    actions: intActions;
    
    // ==================================================
    // Class
    elements: Elements;
    styles: Styles;
    
    // ==================================================
    constructor(apply: string, options?: Record<string, any>) {
        const optionsClear: Record<string, any> = {};
        
        if (options != undefined) {
            Object.keys(options as Object).forEach((key) => {
                const value = options![key];
                if (value !== null && value !== '') {
                    optionsClear[key] = value;
                }
            });
        }

        this.options = {
            apply: apply,
            backgroundColor: optionsClear['backgroundColor'] ?? 'transparent',
            colorInactive: optionsClear['colorInactive'] ?? '#FFFFFF',
            colorActive: optionsClear['colorActive'] ?? '#007AFF',
            autoplay: optionsClear['autoplay'] ?? true,
            muted: optionsClear['muted'] ?? false,
            top: optionsClear['top'] ?? null,
        }
        this.identifiersId = {
            container: 'wvp__container',
            top: 'wvp__top',
            middle: 'wvp__middle',
            bottom: 'wvp__bottom',
        };
        this.identifiersClass = {
            all: 'wvp_all',
            buttons: 'wvp__buttons',
            icons: 'wvp__icons',
            fading: 'wvp__fading',
            cursorHide: 'wvp__cursor_hide',
        };
        this.actions = {
            playPause: 'wvp__button__play_pause',
            fullscreen: 'wvp__button__fullscreen',
            pictureInPicture: 'wvp__button__picture_in_picture',
            volume: 'wvp__button__volume',
            rangerVolumeContainer: 'wvp__button__ranger_volume_container',
            rangerVolume: 'wvp__button__ranger_volume',
            rangerVolumePoint: 'wvp__button__ranger_volume_point',
            durationTime: 'wvp__button__duration_time',
            currentTime: 'wvp__button__current_time',
            rangerProguessContainer: 'wvp__button__ranger_proguess_container',
            rangerProguess: 'wvp__button__ranger_proguess',
            rangerProguessPoint: 'wvp__button__ranger_proguess_point',
        };
        //
        this.elements = new Elements(this.options, this.identifiersId, this.identifiersClass, this.actions);
        this.styles = new Styles(this.options, this.identifiersId, this.identifiersClass, this.actions);
        //
        this.init();
    }

    // ==================================================
    // Getters
    get backgroundColor(): string {
        return this.options.backgroundColor;
    }
    get colorInactive(): string {
        return this.options.colorInactive;
    }
    get colorActive(): string {
        return this.options.colorActive;
    }

    // ==================================================
    // Setters
    set backgroundColor(value: string) {
        if (this.options.backgroundColor == value) return;
        this.options.backgroundColor = value;
        new IOError('Error backgroundColor(); not suport!');
    }
    set colorInactive(value: string) {
        if (this.options.colorInactive == value) return;
        this.options.colorInactive = value;
        new IOError('Error colorInactive(); not suport!');
    }
    set colorActive(value: string) {
        if (this.options.colorActive == value) return;
        this.options.colorActive = value;
        new IOError('Error colorActive(); not suport!');
    }

    // ==================================================
    private init() {
        this.elements.build();
        this.styles.build();
    }
}
