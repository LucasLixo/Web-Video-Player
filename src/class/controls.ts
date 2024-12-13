import intButtons from "../interfaces/buttons";
import intControls from "../interfaces/controls";
import intIconsPath from "../interfaces/icons_path";

export default class Controls {
    // ==================================================
    elementVideo: HTMLVideoElement;
    buttons: intButtons;
    pathIcons: intIconsPath;

    // ==================================================
    constrols: intControls;

    // ==================================================
    constructor(elementVideo: HTMLVideoElement, options: {
        buttons: intButtons, pathIcons: intIconsPath, autoplay: boolean,
        muted: boolean,
    }) {
        this.elementVideo = elementVideo;
        this.buttons = options.buttons;
        this.pathIcons = options.pathIcons;

        this.constrols = {
            isPlaying: options.autoplay,
            volume: options.muted ? 0 : 70,
        };

        this.elementVideo.removeAttribute('controls');
        this.elementVideo.addEventListener('loadedmetadata', () => {
            elementVideo.controls = false;
        });

        console.log('this.togglePlayPause();');
        this.togglePlayPause();
    }

    // ==================================================
    private togglePlayPause(): void {
        const buttonPlayPause: HTMLButtonElement = document.querySelector('button[key="' + `${this.buttons.playPause}` + '"]') as HTMLButtonElement;
        const svgPlayPause: SVGPathElement = buttonPlayPause.querySelector('svg > path') as SVGPathElement;

        const thisEvent: Function = (videoElement: HTMLVideoElement): void => {
            if (videoElement.paused) {
                videoElement.play();
                this.constrols.isPlaying = true;
                svgPlayPause.setAttribute('d', this.pathIcons.pause);
            } else {
                videoElement.pause();
                this.constrols.isPlaying = false;
                svgPlayPause.setAttribute('d', this.pathIcons.play);
            }
        }

        this.elementVideo.addEventListener('click', (event: MouseEvent) => {
            thisEvent(this.elementVideo);
        });

        buttonPlayPause.addEventListener('click', (event: MouseEvent) => {
            thisEvent(this.elementVideo);
        });
    }
}