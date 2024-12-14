// Interfaces
import intActions from "../interfaces/actions";
import intOptions from "../interfaces/options";
import intIconsPath from "../interfaces/icons_path";
import intControls from "../interfaces/controls";
// Class
import IOError from "../class/io_error";

export default class Controls {
    // ==================================================
    private elementContainer: HTMLDivElement;
    private elementVideo: HTMLVideoElement;

    // ==================================================
    private actions: intActions;
    private iconsPath: intIconsPath;

    // ==================================================
    private controls: intControls;

    // ==================================================
    constructor(
        elementContainer: HTMLDivElement,
        elementVideo: HTMLVideoElement,
        options: intOptions,
        actions: intActions,
        iconsPath: intIconsPath,
    ) {
        this.elementContainer = elementContainer;
        this.elementVideo = elementVideo;

        this.actions = actions;
        this.iconsPath = iconsPath;

        this.controls = {
            playing: options.autoplay,
            fullscreen: false,
            pictureInPicture: false,
            volume: !options.muted,
            rangerVolume: options.muted ? 0.0 : 1.0,
            durationTime: this.formatTime(this.elementVideo.duration ?? 0),
            currentTime: this.formatTime(0),
            duration: this.elementVideo.duration,
            current: 0,
        };

        this.build();
    }

    // ==================================================
    private build(): void {
        this.buildConfig();
        this.buildPlayPause();
        this.buildFullscreen();
        this.buildPictureInPicture();
        this.buildVolume();
        this.buildRangerVolume();
        this.buildDurationTime();
        this.buildCurrentTime();
        this.buildRangerProguess();
    }

    // ==================================================
    private buildConfig: Function = (): void => {
        this.elementVideo.removeAttribute('controls');
        this.elementVideo.controls = false;
        this.elementVideo.currentTime = this.controls.current;
    }

    // ==================================================
    private buildPlayPause: Function = (): void => {
        const buttonsPlayPause: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button[action="' + `${this.actions.playPause}` + '"]') as NodeListOf<HTMLButtonElement>;

        if (buttonsPlayPause.length === 0) {
            new IOError("Is empty Play/Pause.");
            return;
        }

        function handlePlayPause(videoElement: HTMLVideoElement): void {
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
                    svgPath.setAttribute('d', this.iconsPath.play);
                }
            });
        });
        this.elementVideo.addEventListener('play', () => {
            this.controls.playing = true;

            buttonsPlayPause.forEach((button) => {
                const svgPath = button.querySelector('svg > path') as SVGPathElement;
                if (svgPath) {
                    svgPath.setAttribute('d', this.iconsPath.pause);
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
    private buildFullscreen: Function = (): void => {
        const buttonFullscreen: HTMLButtonElement = document.querySelector('button[action="' + `${this.actions.fullscreen}` + '"]') as HTMLButtonElement;
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
                svgFullscreen.setAttribute('d', this.iconsPath.fullscreenOn);
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
                svgFullscreen.setAttribute('d', this.iconsPath.fullscreenOff);
            }
        });
    }

    // ==================================================
    private buildPictureInPicture: Function = (): void => {
        const buttonPictureInPicture: HTMLButtonElement = document.querySelector('button[action="' + `${this.actions.pictureInPicture}` + '"]') as HTMLButtonElement;

        buttonPictureInPicture.addEventListener('click', () => {
            if (this.elementVideo.requestPictureInPicture) {
                this.elementVideo.requestPictureInPicture();
            }
        });
    }

    // ==================================================
    private buildVolume: Function = (): void => {
        const buttonVolume: HTMLButtonElement = document.querySelector('button[action="' + `${this.actions.volume}` + '"]') as HTMLButtonElement;
        const svgVolume: SVGPathElement = buttonVolume.querySelector('svg > path') as SVGPathElement;

        buttonVolume.addEventListener('click', () => {
            if (this.elementVideo.muted || this.elementVideo.volume === 0) {
                this.elementVideo.muted = false;
                this.elementVideo.volume = 1.0;
                svgVolume.setAttribute('d', this.iconsPath.volumeOn);
            } else {
                this.elementVideo.muted = true;
                this.elementVideo.volume = 0.0;
                svgVolume.setAttribute('d', this.iconsPath.volumeOff);
            }
        });
    }

    // ==================================================
    private buildRangerVolume: Function = (): void => { }

    // ==================================================
    private buildDurationTime: Function = (): void => {
        const durationTime: HTMLElement = document.querySelector('p[action="' + `${this.actions.durationTime}` + '"]') as HTMLElement;

        durationTime.innerHTML = this.controls.durationTime;
    }

    // ==================================================
    private buildCurrentTime: Function = (): void => {
        const currentTime: HTMLElement = document.querySelector('p[action="' + `${this.actions.currentTime}` + '"]') as HTMLElement;
        
        this.elementVideo.addEventListener('timeupdate', () => {
            this.controls.currentTime = this.formatTime(this.elementVideo.currentTime ?? 0);
            this.controls.current = this.elementVideo.currentTime ?? 0;

            currentTime.innerHTML = this.controls.currentTime;
        });
    }

    // ==================================================
    private buildRangerProguess: Function = (): void => {
        const rangerProguess: HTMLDivElement = document.querySelector('div[action="' + `${this.actions.rangerProguess}` + '"]') as HTMLDivElement;
        const rangerProguessPoint: HTMLDivElement = document.querySelector('div[action="' + `${this.actions.rangerProguessPoint}` + '"]') as HTMLDivElement;

        this.elementVideo.addEventListener('timeupdate', () => {
            const currentTime: number = this.elementVideo.currentTime as number;
            const duration: number = this.elementVideo.duration as number;

            const progressPercentage: number = (currentTime / duration) * 100;

            rangerProguess.setAttribute('style', `width: ${progressPercentage}%;`);
            rangerProguessPoint.setAttribute('style', `left: calc(${progressPercentage}% - 1%);`);
        });
    }













    // ==================================================
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