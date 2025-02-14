import IOError from "./class/io_error";
import IOElements from "./class/io_elements";
import identifiersClass from "./interfaces/indentifers_class";
import identifiersId from "./interfaces/indentifers_id";
import options from "./interfaces/options";

// Simple Video Player
class SVP {
    // Consts
    private optionsDefault: options = {
        settings: {
            autoplay: false,
        },
        video: {
            volume: 70,
        }
    };
    private options?: options;
    // Indentifers
    private identifiersClass: identifiersClass = {
        all: 'svp_all',
        buttons: 'svp__buttons',
        icons: 'svp__icons',
        fading: 'svp__fading',
        hide: 'svp__hide',
    };
    private identifiersId: identifiersId = {
        container: 'svp__container',
        video: 'svp',
        top: 'svp__top',
        middle: 'svp__middle',
        bottom: 'svp__bottom',
    };
    // Video
    private tagVideo?: HTMLVideoElement;

    // Constructor
    constructor(options?: Record<string, any>) {
        // Definition
        this.options = {
            settings: {
                autoplay: options?.settings?.autoplay ?? this.optionsDefault.settings.autoplay,
            },
            video: {
                volume: options?.video?.volume ?? this.optionsDefault.video.volume,
            }
        }
        
        if (this.options == undefined) {
            new IOError("Options undefinded");
        }

        this.tagVideo = document.getElementById(this.identifiersId.video) as HTMLVideoElement | undefined;

        if (this.tagVideo == undefined) {
            new IOError("Tag Video undefinded");
        }

        this.build();
    }
    
    // Build
    private build() {
        new IOElements(this.options!, this.identifiersClass, this.identifiersId, this.tagVideo!);
    }
}