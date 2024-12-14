// Interfaces
import intIdentifiersId from "../interfaces/identifiers_id";
import intIdentifiersClass from "../interfaces/identifiers_class";
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
    private identifiersId: intIdentifiersId;
    private identifiersClass: intIdentifiersClass;
    private actions: intActions;
    private iconsPath: intIconsPath;

    // ==================================================
    private controls: intControls;

    // ==================================================
    constructor(
        elementContainer: HTMLDivElement,
        elementVideo: HTMLVideoElement,
        identifiersId: intIdentifiersId,
        identifiersClass: intIdentifiersClass,
        options: intOptions,
        actions: intActions,
        iconsPath: intIconsPath,
    ) {
        this.elementContainer = elementContainer;
        this.elementVideo = elementVideo;

        this.identifiersId = identifiersId;
        this.identifiersClass = identifiersClass;
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
        this.buildFading();
        this.buildPlayPause();
        this.buildFullscreen();
        this.buildPictureInPicture();
        this.buildVolume();
        this.buildRangerVolume();
        this.buildDurationTime();
        this.buildCurrentTime();
        this.buildRangerProguess();
        this.buildObserver();
    }

    // ==================================================
    private buildConfig: Function = (): void => {
        this.elementVideo.removeAttribute('controls');
        this.elementVideo.controls = false;
        this.elementVideo.currentTime = this.controls.current;
        this.elementVideo.setAttribute('playsinline', '');
        this.elementVideo.setAttribute('controlslist', 'nodownload noremoteplayback');
        this.elementVideo.addEventListener('contextmenu', (event: MouseEvent) => {
            event.preventDefault();
        });
        if (this.controls.playing) {
            this.elementVideo.setAttribute('autoplay', '');
        } else {
            this.elementVideo.removeAttribute('autoplay');
        }
        if (!this.controls.volume) {
            this.elementVideo.setAttribute('muted', '');
        } else {
            this.elementVideo.removeAttribute('muted');
        }
    }

    // ==================================================
    private buildFading: Function = (): void => {
        const allContainers: HTMLElement[] = [
            document.getElementById(this.identifiersId.top) as HTMLElement,
            document.getElementById(this.identifiersId.middle) as HTMLElement,
            document.getElementById(this.identifiersId.bottom) as HTMLElement,
        ];

        let hideTimeout: ReturnType<typeof setTimeout> | null = null;

        const hideControls: Function = (): void => {
            if (!this.elementVideo.paused) {
                allContainers.forEach((container) => {
                    container.classList.add(this.identifiersClass.fading);
                    this.elementContainer.classList.add(this.identifiersClass.cursorHide);
                });
            }
        };

        const showControls: Function = (): void => {
            allContainers.forEach((container) => {
                container.classList.remove(this.identifiersClass.fading);
                this.elementContainer.classList.remove(this.identifiersClass.cursorHide);
            });
            if (hideTimeout) clearTimeout(hideTimeout);
            hideTimeout = setTimeout(hideControls, 2500);
        };

        this.elementContainer.addEventListener('mousemove', () => {
            showControls();
        });

        showControls();
    };

    // ==================================================
    private buildPlayPause: Function = (): void => {
        const buttonsPlayPause: NodeListOf<HTMLButtonElement> = document.querySelectorAll('button[action="' + `${this.actions.playPause}` + '"]') as NodeListOf<HTMLButtonElement>;

        if (buttonsPlayPause.length === 0) {
            new IOError("Is empty Play/Pause.");
            return;
        }

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
            this.playPauseListener();
        });
        buttonsPlayPause.forEach((button) => {
            button.addEventListener('click', () => {
                this.playPauseListener();
            });
        });
    }

    // ==================================================
    private buildFullscreen: Function = (): void => {
        const buttonFullscreen: HTMLButtonElement = document.querySelector('button[action="' + `${this.actions.fullscreen}` + '"]') as HTMLButtonElement;

        buttonFullscreen.addEventListener('click', () => {
            this.fullscreenListener();
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

        /* this.elementVideo.addEventListener('volumechange', () => {
            this.volumeListener();
        }); */

        buttonVolume.addEventListener('click', () => {
            this.volumeListener();
        });
    }

    // ==================================================
    private buildRangerVolume: Function = (): void => { }

    // ==================================================
    private buildDurationTime: Function = (): void => {
        const durationTime: HTMLElement = document.querySelector('p[action="' + `${this.actions.durationTime}` + '"]') as HTMLElement;

        this.elementVideo.addEventListener('loadeddata', () => {
            this.controls.durationTime = this.formatTime(this.elementVideo.duration ?? 0);
            this.controls.duration = this.elementVideo.duration ?? 0;

            durationTime.innerHTML = this.controls.durationTime;
        });
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
        const rangerProguessContainer: HTMLDivElement = document.getElementById(this.actions.rangerProguessContainer) as HTMLDivElement;
        const rangerProguess: HTMLDivElement = document.getElementById(this.actions.rangerProguess) as HTMLDivElement;
        const rangerProguessPoint: HTMLDivElement = document.getElementById(this.actions.rangerProguessPoint) as HTMLDivElement;

        this.elementVideo.addEventListener('timeupdate', () => {
            const currentTime: number = this.elementVideo.currentTime as number;
            const duration: number = this.elementVideo.duration as number;

            const progressPercentage: number = (currentTime / duration) * 100;

            rangerProguess.setAttribute('style', `width: ${progressPercentage}%;`);
            rangerProguessPoint.setAttribute('style', `left: calc(${progressPercentage}% - 1%);`);
        });

        rangerProguessContainer.addEventListener('click', (event: MouseEvent) => {
            const rect: DOMRect = rangerProguessContainer.getBoundingClientRect();
            const clickX: number = event.clientX - rect.left;
            const width: number = rect.width;
            const percentage = (clickX / width) * 100;

            const newTime = (this.controls.duration * percentage) / 100;
            this.elementVideo.currentTime = newTime;

            this.controls.currentTime = this.formatTime(newTime);
            this.controls.current = newTime;
        });
    }

    // ==================================================
    private buildObserver: Function = (): void => {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.elementVideo.currentTime = Math.max(0, Math.min(this.elementVideo.duration, this.elementVideo.currentTime - 10));
                    break;
                case ' ':
                    this.playPauseListener();
                    break;
                case 'ArrowRight':
                    this.elementVideo.currentTime = Math.max(0, Math.min(this.elementVideo.duration, this.elementVideo.currentTime + 10));
                    break;
                case 'ArrowDown':
                    break;
                case 'ArrowUp':
                    break;
                case 'f':
                    this.fullscreenListener();
                    break;
                case 'p':
                    if (this.elementVideo.requestPictureInPicture) {
                        this.elementVideo.requestPictureInPicture();
                    }
                    break;
                case 'm':
                    this.volumeListener();
                    break;
                case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
                    const percentage = parseInt(event.key) * 10;
                    const newTime = (percentage / 100) * this.controls.duration;
                    this.elementVideo.currentTime = newTime;

                    this.controls.currentTime = this.formatTime(newTime);
                    this.controls.current = newTime;
                    break;
            }
        });
    };












    // ==================================================
    private playPauseListener(): void {
        if (this.elementVideo.paused) {
            this.elementVideo.play();
        } else {
            this.elementVideo.pause();
        }
    };

    // ==================================================
    private volumeListener(): void {
        const buttonVolume: HTMLButtonElement = document.querySelector('button[action="' + `${this.actions.volume}` + '"]') as HTMLButtonElement;
        const svgVolume: SVGPathElement = buttonVolume.querySelector('svg > path') as SVGPathElement;

        if (this.elementVideo.muted || this.elementVideo.volume === 0) {
            svgVolume.setAttribute('d', this.iconsPath.volumeOn);
            this.elementVideo.muted = false;
            this.elementVideo.volume = 1.0;
        } else {
            svgVolume.setAttribute('d', this.iconsPath.volumeOff);
            this.elementVideo.muted = true;
            this.elementVideo.volume = 0.0;
        }
    }

    // ==================================================
    private fullscreenListener(): void {
        const buttonFullscreen: HTMLButtonElement = document.querySelector('button[action="' + `${this.actions.fullscreen}` + '"]') as HTMLButtonElement;
        const svgFullscreen: SVGPathElement = buttonFullscreen.querySelector('svg > path') as SVGPathElement;

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