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
        var optionsClear: Record<string, any> = {
            settings: {},
            show: {},
            style: {},
        };
    
        if (!apply) {
            new IOError("Error apply(); not defined!");
        }
    
        if (options) {
            Object.keys(options).forEach((key) => {
                let value = options[key];
                if (value !== null && value !== "") {
                    optionsClear[key] = value;
                }
            });
        }
    
        this.options = {
            apply: apply,
            settings: {
                autoplay: optionsClear.settings?.autoplay ?? true,
                muted: optionsClear.settings?.muted ?? false,
            },
            show: {
                titleTop: optionsClear.show?.titleTop ?? false,
                playPause: optionsClear.show?.playPause ?? true,
                playPauseCenter: optionsClear.show?.playPauseCenter ?? true,
                fullscreen: optionsClear.show?.fullscreen ?? true,
                pictureInPicture: optionsClear.show?.pictureInPicture ?? true,
                volume: optionsClear.show?.volume ?? true,
                rangerVolume: optionsClear.show?.rangerVolume ?? true,
                durationTime: optionsClear.show?.durationTime ?? true,
                currentTime: optionsClear.show?.currentTime ?? true,
                rangerProguess: optionsClear.show?.rangerProguess ?? true,
            },
            style: {
                titleTag: optionsClear.style?.titleTag ?? null,
                backgroundColor: optionsClear.style?.backgroundColor ?? "#000000",
                colorInactive: optionsClear.style?.colorInactive ?? "#FFFFFF",
                colorActive: optionsClear.style?.colorActive ?? "#007AFF",
                shadow: optionsClear.style?.shadow ?? true,
            },
        };    
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
            rangerVolumeInput: 'wvp__button__ranger_volume_input',
            rangerVolumeProguess: 'wvp__button__ranger_volume_proguess',
            durationTime: 'wvp__button__duration_time',
            currentTime: 'wvp__button__current_time',
            rangerProguessContainer: 'wvp__button__ranger_proguess_container',
            rangerProguessInput: 'wvp__button__ranger_proguess_input',
            rangerProguessProguess: 'wvp__button__ranger_proguess_proguess',
        };
        //
        this.elements = new Elements(this.options, this.identifiersId, this.identifiersClass, this.actions);
        this.styles = new Styles(this.options, this.identifiersId, this.identifiersClass, this.actions);
        //
        this.init();
    }

    // ==================================================
    private init() {
        this.elements.build();
        this.styles.build();
    }
}
