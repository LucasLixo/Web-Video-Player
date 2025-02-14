import IOError from "./io_error";
import identifiersClass from "../interfaces/indentifers_class";
import identifiersId from "../interfaces/indentifers_id";
import options from "../interfaces/options";
import identifiersActions from "../interfaces/indentifers_actions";
import IndentifersIcons from "../interfaces/indentifers_icons";

interface controlsElements {
    currentTime: HTMLParagraphElement,
    durationTime: HTMLParagraphElement,
}

interface controlsValue {
    current: string,
    currentTime: number,
    duration: string,
    durationTime: number,
}

export default class IOControllers {
    private options: options;
    private identifiersClass: identifiersClass;
    private identifiersId: identifiersId;
    private identifiersActions: identifiersActions;
    private identifiersIcons: IndentifersIcons;

    // ==================================================
    private elementVideo: HTMLVideoElement;

    // ==================================================
    private controlsElements: controlsElements;
    private controlsValue: controlsValue = {
        current: '00:00',
        currentTime: 0,
        duration: '00:00',
        durationTime: 0,
    };

    // ==================================================
    constructor(
        options: options,
        identifiersClass: identifiersClass,
        identifiersId: identifiersId,
        identifiersActions: identifiersActions,
        identifiersIcons: IndentifersIcons,
        elementVideo: HTMLVideoElement) {
        this.options = options;
        this.identifiersClass = identifiersClass;
        this.identifiersId = identifiersId;
        this.identifiersActions = identifiersActions;
        this.identifiersIcons = identifiersIcons;
        //
        this.elementVideo = elementVideo;

        this.controlsElements = {
            currentTime: document.querySelector(`p[action="${this.identifiersActions.currentTime}"]`)!,
            durationTime: document.querySelector(`p[action="${this.identifiersActions.durationTime}"]`)!,
        }

        this.build();
    }

    // Build generate
    private build(): void {
        this.buildPrepareVideo();
        this.buildPrepareVideoTime();
    }

    private buildPrepareVideo(): void {
        this.elementVideo.removeAttribute('controls');
        this.elementVideo.removeAttribute('height');
        this.elementVideo.removeAttribute('width');
        this.elementVideo.controls = false;
        this.elementVideo.currentTime = this.options.currentTime;
        this.elementVideo.setAttribute('playsinline', '');
        this.elementVideo.setAttribute('preload', 'auto');
        this.elementVideo.setAttribute('controlslist', 'nodownload nofullscreen noremoteplayback');
        this.elementVideo.setAttribute('disablepictureinpicture', '');
        this.elementVideo.setAttribute('disableremoteplayback', '');
        this.elementVideo.setAttribute('disabledownload', '');
        this.elementVideo.addEventListener('contextmenu', (event: MouseEvent) => {
            event.preventDefault();
        });
        if (this.options.autoplay) {
            this.elementVideo.setAttribute('autoplay', '');
        } else {
            this.elementVideo.removeAttribute('autoplay');
        }
    }

    private buildPrepareVideoTime(): void {
        this.elementVideo.onloadedmetadata = (): void => {
            this.controlsElements.currentTime.innerHTML = this.controlsValue.current;
            this.controlsValue.durationTime = this.elementVideo.duration;
            this.controlsValue.duration = this.formatTime(this.elementVideo.duration ?? 0);
            this.controlsElements.durationTime.innerHTML = this.controlsValue.duration;
        }
    }

    // ==================================================
    // Format Time
    private formatTime(seconds: number): string {
        function padZero(number: number): string {
            return (number < 10 ? '0' : '') + number;
        }

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secondsLeft = Math.floor(seconds % 60);

        if (hours > 0) {
            return padZero(hours) + ':' + padZero(minutes) + ':' + padZero(secondsLeft);
        }

        return padZero(minutes) + ':' + padZero(secondsLeft);
    }
}