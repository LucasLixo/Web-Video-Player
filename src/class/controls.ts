import intButtons from "../interfaces/buttons";
import intControls from "../interfaces/controls";
import intIconsPath from "../interfaces/icons_path";
import IOError from "./io_error";

export default class Controls {
    // ==================================================
    elementContainer: HTMLVideoElement;
    elementVideo: HTMLVideoElement;
    buttons: intButtons;
    pathIcons: intIconsPath;

    // ==================================================
    controls: intControls;

    // ==================================================
    constructor(elementContainer: HTMLElement, elementVideo: HTMLVideoElement, options: {
        buttons: intButtons, pathIcons: intIconsPath, autoplay: boolean,
        muted: boolean,
    }) {
        this.elementContainer = elementContainer as HTMLVideoElement;
        this.elementVideo = elementVideo;
        this.buttons = options.buttons;
        this.pathIcons = options.pathIcons;

        this.controls = {
            playing: options.autoplay,
            fullscreen: false,
            pictureInPicture: false,
            volume: !options.muted,
            rangerVolume: options.muted ? 0.0 : 1.0,
            rangerProguess: 0,
            duration: this.formatTime(0),
            currentTime: 0,
        };

        this.elementVideo.removeAttribute('controls');
        elementVideo.controls = false;
        this.controls.duration = this.formatTime(this.elementVideo.duration);
        this.elementVideo.currentTime = this.controls.currentTime;
        
        this.togglePlayPause();
        this.duration();
        this.rangerVolume();
        this.toggleVolume();
        this.pictureInPicture();
        this.fullscreen();
    }

    // ==================================================
    private togglePlayPause(): void {
        const buttonsPlayPause: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button[key="' + `${this.buttons.playPause}` + '"]') as NodeListOf<HTMLButtonElement>;

        if (buttonsPlayPause.length === 0) {
            new IOError("Is empty Play/Pause.");
            return;
        }

        const handlePlayPause = (videoElement: HTMLVideoElement): void => {
            if (videoElement.paused) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
        };

        this.elementVideo.addEventListener('pause', () => {
            this.controls.playing = false;

            buttonsPlayPause.forEach((button) => {
                const svgPath = button.querySelector('svg > path') as SVGPathElement;
                if (svgPath) {
                    svgPath.setAttribute('d', this.pathIcons.play);
                }
            });
        });
        this.elementVideo.addEventListener('play', () => {
            this.controls.playing = true;

            buttonsPlayPause.forEach((button) => {
                const svgPath = button.querySelector('svg > path') as SVGPathElement;
                if (svgPath) {
                    svgPath.setAttribute('d', this.pathIcons.pause);
                }
            });
        });
        this.elementVideo.addEventListener('click', () => {
            handlePlayPause(this.elementVideo);
        });
        buttonsPlayPause.forEach((button) => {
            button.addEventListener('click', () => {
                handlePlayPause(this.elementVideo);
            });
        });
    }

    // ==================================================
    private duration(): void {
        const pDuration: HTMLElement = document.querySelector('p[key="' + `${this.buttons.duration}` + '"]') as HTMLElement;

        pDuration.innerHTML = this.controls.duration;
    }

    // ==================================================
    private rangerVolume(): void {
        const rangerProguess: HTMLDivElement = document.querySelector('div[key="' + `${this.buttons.volume}` + '"]') as HTMLDivElement;
        const rangerProguessPoint: HTMLDivElement = document.querySelector('div[key="' + `${this.buttons.volume}` + '"]') as HTMLDivElement;

        this.elementVideo.addEventListener('timeupdate', () => {
            const currentTime: number = this.elementVideo.currentTime as number;
            const duration: number = this.elementVideo.duration as number;
    
            const progressPercentage: number = (currentTime / duration) * 100;
    
            rangerProguess.setAttribute('style', `width: ${progressPercentage}%;`);
            rangerProguessPoint.setAttribute('style', `left: calc(${progressPercentage}% - 1%);`);
    
            this.controls.currentTime = currentTime;
            this.controls.rangerProguess = progressPercentage;
        });
    }

    // ==================================================
    private toggleVolume(): void {
        const buttonVolume: HTMLButtonElement = document.querySelector('button[key="' + `${this.buttons.volume}` + '"]') as HTMLButtonElement;
        const svgVolume: SVGPathElement = buttonVolume.querySelector('svg > path') as SVGPathElement;

        buttonVolume.addEventListener('click', () => {
            if (this.elementVideo.muted || this.elementVideo.volume === 0) {
                this.elementVideo.muted = false;
                this.elementVideo.volume = 1.0;
                svgVolume.setAttribute('d', this.pathIcons.volumeOn);
            } else {
                this.elementVideo.muted = true;
                this.elementVideo.volume = 0.0;
                svgVolume.setAttribute('d', this.pathIcons.volumeOff);
            }
        });
    }

    // ==================================================
    private pictureInPicture(): void {
        const buttonPictureInPicture: HTMLButtonElement = document.querySelector('button[key="' + `${this.buttons.pictureInPicture}` + '"]') as HTMLButtonElement;

        buttonPictureInPicture.addEventListener('click', () => {
            if (this.elementVideo.requestPictureInPicture) {
                this.elementVideo.requestPictureInPicture();
            }
        });
    }

    // ==================================================
    private fullscreen(): void {
        const buttonFullscreen: HTMLButtonElement = document.querySelector('button[key="' + `${this.buttons.fullscreen}` + '"]') as HTMLButtonElement;
        const svgFullscreen: SVGPathElement = buttonFullscreen.querySelector('svg > path') as SVGPathElement;

        buttonFullscreen.addEventListener('click', () => {
            if (!this.controls.fullscreen) {
                this.controls.fullscreen = true;
                if (this.elementContainer.requestFullscreen) {
                    this.elementContainer.requestFullscreen();
                } else if ((this.elementContainer as any).mozRequestFullScreen) {
                    (this.elementContainer as any).mozRequestFullScreen();
                } else if ((this.elementContainer as any).webkitRequestFullScreen) {
                    (this.elementContainer as any).webkitRequestFullScreen();
                } else if ((this.elementContainer as any).msRequestFullscreen) {
                    (this.elementContainer as any).msRequestFullscreen();
                }
                svgFullscreen.setAttribute('d', this.pathIcons.fullscreenOn);
            } else {
                this.controls.fullscreen = false;
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if ((document as any).webkitExitFullscreen) {
                    (document as any).webkitExitFullscreen();
                } else if ((document as any).mozCancelFullScreen) {
                    (document as any).mozCancelFullScreen();
                } else if ((document as any).msExitFullscreen) {
                    (document as any).msExitFullscreen();
                }
                svgFullscreen.setAttribute('d', this.pathIcons.fullscreenOff);
            }
        });
    }

    // ==================================================
    private formatTime: Function = (seconds: number): string => {
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