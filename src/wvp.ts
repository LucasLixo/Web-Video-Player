import IOError from "./class/io_error";
import IOElements from "./class/io_elements";
import identifiersClass from "./interfaces/indentifers_class";
import identifiersId from "./interfaces/indentifers_id";
import indentifersOptions from "./interfaces/options";
import identifiersActions from "./interfaces/indentifers_actions";
import IOControllers from "./class/io_controllers";
import IndentifersIcons from "./interfaces/indentifers_icons";

// Web Video Player
class WVP {
    // Consts
    private optionsDefault: indentifersOptions = {
        autoplay: false,
        volume: 1.0,
        currentTime: 0,
    };
    private options?: indentifersOptions;
    // Indentifers
    private identifiersClass: identifiersClass = {
        all: 'wvp__all',
        buttons: 'wvp__buttons',
        icons: 'wvp__icons',
        fading: 'wvp__fading',
        hide: 'wvp__hide',
    };
    private identifiersId: identifiersId = {
        container: 'wvp__container',
        top: 'wvp__top',
        middle: 'wvp__middle',
        bottom: 'wvp__bottom',
    };
    private identifiersActions: identifiersActions = {
        playPause: 'wvp__action__play__pause',
        fullscreen: 'wvp__action__fullscreen',
        volume: 'wvp__action__volume',
        durationTime: 'wvp__action__duration__time',
        currentTime: 'wvp__action__current__time',
        pictureInPicture: 'wvp__action__picture__in__picture',
        rangerProguessContainer: 'wvp__action__ranger__proguess__container',
        rangerProguessInput: 'wvp__action__ranger__proguess__input',
        rangerProguessDiv: 'wvp__action__ranger__proguess__div',
    };
    private indentifersIcons: IndentifersIcons = {
        fullscreenOn: 'M333-200v-133H200v-60h193v193h-60Zm234 0v-193h193v60H627v133h-60ZM200-567v-60h133v-133h60v193H200Zm367 0v-193h60v133h133v60H567Z',
        fullscreenOff: 'M200-200v-193h60v133h133v60H200Zm0-367v-193h193v60H260v133h-60Zm367 367v-60h133v-133h60v193H567Zm133-367v-133H567v-60h193v193h-60Z',
        // forward10: 'M360 746V534h-54v-49h104v261h-50Zm147 0q-18.7 0-31.35-12.65Q463 720.7 463 702V529q0-18.7 12.65-31.35Q488.3 485 507 485h83q18.7 0 31.35 12.65Q634 510.3 634 529v173q0 18.7-12.65 31.35Q608.7 746 590 746h-83Zm6-50h71V534h-71v162Zm-33 280q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616q0-75 28-140.5T225 361q49-49 114.5-77T480 256h21l-78-78 41-41 147 147-147 147-41-41 74-74h-17q-125.357 0-212.679 87.321Q180 490.643 180 616t87.321 212.679Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616h60q0 75-28 140.5T735 871q-49 49-114.5 77T480 976Z',
        // forward30: 'M281 746v-50h121v-56h-82v-49h82v-57H281v-49h127q18.7 0 31.35 12.65Q452 510.3 452 529v173q0 18.7-12.65 31.35Q426.7 746 408 746H281Zm272 0q-18.7 0-31.35-12.65Q509 720.7 509 702V529q0-18.7 12.65-31.35Q534.3 485 553 485h83q18.7 0 31.35 12.65Q680 510.3 680 529v173q0 18.7-12.65 31.35Q654.7 746 636 746h-83Zm6-50h71V534h-71v162Zm-79 280q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616q0-75 28-140.5T225 361q49-49 114.5-77T480 256h21l-78-78 41-41 147 147-147 147-41-41 74-74h-17q-125.357 0-212.679 87.321Q180 490.643 180 616t87.321 212.679Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616h60q0 75-28 140.5T735 871q-49 49-114.5 77T480 976Z',
        // replay10: 'M480 976q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616h60q0 125 87.321 212.5Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616t-85-212.679Q610 316 485 316h-22l73 73-42 42-147-147 147-147 41 41-78 78h23q75 0 140.5 28T735 361q49 49 77 114.5T840 616q0 75-28 140.5T735 871q-49 49-114.5 77T480 976ZM360 746V534h-54v-49h104v261h-50Zm147 0q-18.7 0-31.35-12.65Q463 720.7 463 702V529q0-18.7 12.65-31.35Q488.3 485 507 485h83q18.7 0 31.35 12.65Q634 510.3 634 529v173q0 18.7-12.65 31.35Q608.7 746 590 746h-83Zm6-50h71V534h-71v162Z',
        // replay30: 'M480 976q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616h60q0 125 87.321 212.5Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616t-85-212.679Q610 316 485 316h-22l73 73-42 42-147-147 147-147 41 41-78 78h23q75 0 140.5 28T735 361q49 49 77 114.5T840 616q0 75-28 140.5T735 871q-49 49-114.5 77T480 976ZM281 746v-50h121v-55h-82v-50h82v-56H281v-50h127q18.7 0 31.35 12.65Q452 510.3 452 529v173q0 18.7-12.65 31.35Q426.7 746 408 746H281Zm272 0q-18.7 0-31.35-12.65Q509 720.7 509 702V529q0-18.7 12.65-31.35Q534.3 485 553 485h83q18.7 0 31.35 12.65Q680 510.3 680 529v173q0 18.7-12.65 31.35Q654.7 746 636 746h-83Zm6-50h71V535h-71v161Z',
        pause: 'M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z',
        play: 'M320-200v-560l440 280-440 280Z',
        pictureInPicture: 'M405-274h361v-258H405v258ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z',
        volumeOn: 'M560-131v-62q97-28 158.5-107.5T780-481q0-101-61-181T560-769v-62q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm420 48v-337q55 17 87.5 64T660-480q0 57-33 104t-87 64ZM420-648 307-540H180v120h127l113 109v-337Zm-94 168Z',
        volumeOff: 'M813-56 681-188q-28 20-60.5 34.5T553-131v-62q23-7 44.5-15.5T638-231L473-397v237L273-360H113v-240h156L49-820l43-43 764 763-43 44Zm-36-232-43-43q20-34 29.5-71.923T773-481q0-103.322-60-184.661T553-769v-62q124 28 202 125.5T833-481q0 51-14 100t-42 93ZM643-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T643-422ZM473-592 369-696l104-104v208Zm-60 286v-150l-84-84H173v120h126l114 114Zm-42-192Z',
    };
    // Video
    private tagVideos?: NodeListOf<HTMLVideoElement>;
    // Icons

    // Constructor
    constructor(options?: Record<string, any>) {
        // Definition
        this.options = {
            autoplay: options?.autoplay ?? this.optionsDefault.autoplay,
            volume: options?.volume ?? this.optionsDefault.volume,
            currentTime: options?.currentTime ?? this.optionsDefault.currentTime,
        }

        if (this.options == undefined) {
            new IOError("Options undefinded");
        }

        // Select tag videos
        this.tagVideos = document.querySelectorAll(`video[plugin="wvp"]`) as NodeListOf<HTMLVideoElement> | undefined;

        if (this.tagVideos == undefined) {
            new IOError("Tag Video undefinded");
        }

        this.build();
    }

    // Build
    private build(): void {
        this.tagVideos!.forEach(elementVideo => {
            new IOElements(
                this.options!,
                this.identifiersClass,
                this.identifiersId,
                this.identifiersActions,
                this.indentifersIcons,
                elementVideo,
            );
            new IOControllers(
                this.options!,
                this.identifiersClass,
                this.identifiersId,
                this.identifiersActions,
                this.indentifersIcons,
                elementVideo,
            );
        });
    }
}