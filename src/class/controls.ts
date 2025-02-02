// Interfaces
import intIdentifiersId from "../interfaces/identifiers_id";
import intIdentifiersClass from "../interfaces/identifiers_class";
import intActions from "../interfaces/actions";
import intActionsElements from "../interfaces/actions_elements";
import intOptions from "../interfaces/options";
import intIconsPath from "../interfaces/icons_path";
import intControls from "../interfaces/controls";
// Class
import IOError from "../class/io_error";

export default class Controls {
    // ==================================================
    private myElements: intActionsElements;

    private proguess: number;

    // ==================================================
    private identifiersClass: intIdentifiersClass;

    // ==================================================
    private controls: intControls;
    private iconsPath: intIconsPath;

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
        this.myElements = {
            // container: elementContainer,
            video: elementVideo,
            id: {
                container: elementContainer,
                top: document.getElementById(identifiersId.top) as HTMLElement,
                middle: document.getElementById(identifiersId.middle) as HTMLElement,
                bottom: document.getElementById(identifiersId.bottom) as HTMLElement,
            },
            actions: {
                playPause: document.querySelectorAll('button[action="' + `${actions.playPause}` + '"]') as NodeListOf<HTMLButtonElement>,
                fullscreen: document.querySelector('button[action="' + `${actions.fullscreen}` + '"]') as HTMLButtonElement,
                pictureInPicture: document.querySelector('button[action="' + `${actions.pictureInPicture}` + '"]') as HTMLButtonElement,
                volume: document.querySelector('button[action="' + `${actions.volume}` + '"]') as HTMLButtonElement,
                rangerVolumeContainer: document.getElementById(actions.rangerVolumeContainer) as HTMLDivElement,
                rangerVolumeInput: document.getElementById(actions.rangerVolumeInput) as HTMLInputElement,
                rangerVolumeProguess: document.getElementById(actions.rangerVolumeProguess) as HTMLDivElement,
                durationTime: document.querySelector('p[action="' + `${actions.durationTime}` + '"]') as HTMLElement,
                currentTime: document.querySelector('p[action="' + `${actions.currentTime}` + '"]') as HTMLElement,
                rangerProguessContainer: document.getElementById(actions.rangerProguessContainer) as HTMLDivElement,
                rangerProguessInput: document.getElementById(actions.rangerProguessInput) as HTMLInputElement,
                rangerProguessProguess: document.getElementById(actions.rangerProguessProguess) as HTMLDivElement,
            },
            svg: {
                fullscreen: null,
                playPause: null,
                pictureInPicture: null,
                volume: null,
            },
        };

        this.myElements.svg = {
            fullscreen: this.myElements.actions.fullscreen.querySelector('svg > path') as SVGPathElement,
            playPause: null,
            pictureInPicture: null,
            volume: this.myElements.actions.volume.querySelector('svg > path') as SVGPathElement,
        };

        this.proguess = 0;

        this.identifiersClass = identifiersClass;

        this.iconsPath = iconsPath;

        this.controls = {
            playing: options.settings.autoplay,
            fullscreen: false,
            pictureInPicture: false,
            volume: !options.settings.muted,
            rangerVolume: options.settings.muted ? 0.0 : 1.0,
            durationTime: this.formatTime(this.myElements.video.duration ?? 0),
            currentTime: this.formatTime(0),
            duration: this.myElements.video.duration,
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
        this.myElements.video.removeAttribute('controls');
        this.myElements.video.controls = false;
        this.myElements.video.currentTime = this.controls.current;
        this.myElements.video.setAttribute('playsinline', '');
        this.myElements.video.setAttribute('preload', 'auto');
        this.myElements.video.setAttribute('controlslist', 'nodownload noremoteplayback');
        this.myElements.video.addEventListener('contextmenu', (event: MouseEvent) => {
            event.preventDefault();
        });
        if (this.controls.playing) {
            this.myElements.video.setAttribute('autoplay', '');
        } else {
            this.myElements.video.removeAttribute('autoplay');
        }
        if (!this.controls.volume) {
            this.myElements.video.setAttribute('muted', '');
        } else {
            this.myElements.video.removeAttribute('muted');
        }
        this.myElements.video.onloadedmetadata = (): void => {
            this.controls.durationTime = this.formatTime(this.myElements.video.duration ?? 0);
            this.controls.duration = this.myElements.video.duration;
        };
    }

    // ==================================================
    private buildFading: Function = (): void => {
        const allContainers: HTMLElement[] = [
            this.myElements.id.top,
            this.myElements.id.middle,
            this.myElements.id.bottom,
        ];

        let hideTimeout: ReturnType<typeof setTimeout> | null = null;

        const hideControls: Function = (): void => {
            if (!this.myElements.video.paused) {
                allContainers.forEach((container) => {
                    container.classList.add(this.identifiersClass.fading);
                    this.myElements.id.container.classList.add(this.identifiersClass.cursorHide);
                });
            }
        };

        const showControls: Function = (): void => {
            allContainers.forEach((container) => {
                container.classList.remove(this.identifiersClass.fading);
                this.myElements.id.container.classList.remove(this.identifiersClass.cursorHide);
            });
            if (hideTimeout) clearTimeout(hideTimeout);
            hideTimeout = setTimeout(hideControls, 2500);
        };

        this.myElements.id.container.addEventListener('mouseleave', () => {
            hideControls();
        });

        this.myElements.id.container.addEventListener('mousemove', () => {
            showControls();
        });

        showControls();
    };

    // ==================================================
    private buildPlayPause: Function = (): void => {
        if (this.myElements.actions.playPause.length === 0) {
            new IOError("Is empty Play/Pause.");
            return;
        }

        this.myElements.video.addEventListener('pause', () => {
            this.controls.playing = false;

            this.myElements.actions.playPause.forEach((button) => {
                const svgPath = button.querySelector('svg > path') as SVGPathElement;
                if (svgPath) {
                    svgPath.setAttribute('d', this.iconsPath.play);
                }
            });
        });
        this.myElements.video.addEventListener('play', () => {
            this.controls.playing = true;

            this.myElements.actions.playPause.forEach((button) => {
                const svgPath = button.querySelector('svg > path') as SVGPathElement;
                if (svgPath) {
                    svgPath.setAttribute('d', this.iconsPath.pause);
                }
            });
        });
        this.myElements.video.addEventListener('click', () => {
            this.playPauseListener();
        });
        this.myElements.actions.playPause.forEach((button) => {
            button.addEventListener('click', () => {
                this.playPauseListener();
            });
        });
    }

    // ==================================================
    private buildFullscreen: Function = (): void => {
        this.myElements.actions.fullscreen.addEventListener('click', () => {
            this.fullscreenListener();
        });
    }

    // ==================================================
    private buildPictureInPicture: Function = (): void => {
        this.myElements.actions.pictureInPicture.addEventListener('click', () => {
            if (this.myElements.video.requestPictureInPicture) {
                this.myElements.video.requestPictureInPicture();
            }
        });
    }

    // ==================================================
    private buildVolume: Function = (): void => {
        this.myElements.actions.volume.addEventListener('click', () => {
            this.volumeListener();
        });
    }

    // ==================================================
    private buildRangerVolume: Function = (): void => { }

    // ==================================================
    private buildDurationTime: Function = (): void => {
        this.myElements.video.addEventListener('loadeddata', () => {
            this.controls.durationTime = this.formatTime(this.myElements.video.duration ?? 0);
            this.controls.duration = this.myElements.video.duration ?? 0;

            this.myElements.actions.durationTime.innerHTML = this.controls.durationTime;
        });
    }

    // ==================================================
    private buildCurrentTime: Function = (): void => {
        this.myElements.video.addEventListener('timeupdate', () => {
            this.controls.currentTime = this.formatTime(this.myElements.video.currentTime ?? 0);
            this.controls.current = this.myElements.video.currentTime ?? 0;
            
            this.proguess = (this.controls.current / this.controls.duration) * 100;
            
            this.rangerProguessProguessListener();
            this.myElements.actions.rangerProguessInput.value = this.proguess.toString();
            this.myElements.actions.currentTime.innerHTML = this.controls.currentTime;
        });
    }

    // ==================================================
    private buildRangerProguess: Function = (): void => {
        this.myElements.actions.rangerProguessInput.oninput = () => {
            this.proguess = parseInt(this.myElements.actions.rangerProguessInput.value, 10);
            
            this.rangerProguessProguessListener();
            this.myElements.video.currentTime = (this.proguess / 100) * this.controls.duration;
        };
    }

    // ==================================================
    private buildObserver: Function = (): void => {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.myElements.video.currentTime = Math.max(0, Math.min(this.controls.duration, this.myElements.video.currentTime - 10));
                    break;
                case ' ':
                    this.playPauseListener();
                    break;
                case 'ArrowRight':
                    this.myElements.video.currentTime = Math.max(0, Math.min(this.controls.duration, this.myElements.video.currentTime + 10));
                    break;
                case 'ArrowDown':
                    break;
                case 'ArrowUp':
                    break;
                case 'f':
                    this.fullscreenListener();
                    break;
                case 'p':
                    if (this.myElements.video.requestPictureInPicture) {
                        this.myElements.video.requestPictureInPicture();
                    }
                    break;
                case 'm':
                    this.volumeListener();
                    break;
                case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
                    const percentage = parseInt(event.key) * 10;
                    const newTime = (percentage / 100) * this.controls.duration;
                    this.myElements.video.currentTime = newTime;

                    this.controls.currentTime = this.formatTime(newTime);
                    this.controls.current = newTime;
                    break;
            }
        });
    };












    // ==================================================
    private playPauseListener(): void {
        if (this.myElements.video.paused) {
            this.myElements.video.play();
        } else {
            this.myElements.video.pause();
        }
    }

    // ==================================================
    private rangerProguessProguessListener(): void {
        if (this.proguess < 25) {
            this.myElements.actions.rangerProguessProguess.setAttribute('style', `width: ${this.proguess + 0.5}%;`);
            return;
        }

        if (this.proguess > 45) {
            this.myElements.actions.rangerProguessProguess.setAttribute('style', `width: ${this.proguess - 0.5}%;`);
            return;
        }

        this.myElements.actions.rangerProguessProguess.setAttribute('style', `width: ${this.proguess}%;`);
    }

    // ==================================================
    private volumeListener(): void {
        if (this.myElements.video.muted || this.myElements.video.volume === 0) {
            this.myElements.svg.volume!.setAttribute('d', this.iconsPath.volumeOn);
            this.myElements.video.muted = false;
            this.myElements.video.volume = 1.0;
        } else {
            this.myElements.svg.volume!.setAttribute('d', this.iconsPath.volumeOff);
            this.myElements.video.muted = true;
            this.myElements.video.volume = 0.0;
        }
    }

    // ==================================================
    private fullscreenListener(): void {
        if (!this.controls.fullscreen) {
            this.controls.fullscreen = true;
            if (this.myElements.id.container.requestFullscreen) {
                this.myElements.id.container.requestFullscreen();
            } else if ((this.myElements.id.container as any).mozRequestFullScreen) {
                (this.myElements.id.container as any).mozRequestFullScreen();
            } else if ((this.myElements.id.container as any).webkitRequestFullScreen) {
                (this.myElements.id.container as any).webkitRequestFullScreen();
            } else if ((this.myElements.id.container as any).msRequestFullscreen) {
                (this.myElements.id.container as any).msRequestFullscreen();
            }
            this.myElements.svg.fullscreen!.setAttribute('d', this.iconsPath.fullscreenOn);
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
            this.myElements.svg.fullscreen!.setAttribute('d', this.iconsPath.fullscreenOff);
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