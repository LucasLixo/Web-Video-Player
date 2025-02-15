import IOError from "./io_error";
import identifiersClass from "../interfaces/indentifers_class";
import identifiersId from "../interfaces/indentifers_id";
import indentifersOptions from "../interfaces/options";
import identifiersActions from "../interfaces/indentifers_actions";
import IndentifersIcons from "../interfaces/indentifers_icons";

interface controlsElements {
    // Containers
    container: HTMLDivElement,
    top: HTMLDivElement,
    middle: HTMLButtonElement,
    bottom: HTMLDivElement,
    // Controllers
    playPause: NodeListOf<HTMLButtonElement>,
    fullscreen: HTMLButtonElement,
    volume: HTMLButtonElement,
    currentTime: HTMLParagraphElement,
    durationTime: HTMLParagraphElement,
    pictureInPicture: HTMLButtonElement,
    rangerProguessContainer: HTMLDivElement,
    rangerProguessInput: HTMLInputElement,
    rangerProguessDiv: HTMLDivElement,
}

interface controlsValue {
    current: string,
    currentTime: number,
    duration: string,
    durationTime: number,
    playing: boolean,
    fullscreen: boolean,
    proguess: number,
}

export default class IOControllers {
    private indentifersOptions: indentifersOptions;
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
        playing: false,
        fullscreen: false,
        proguess: 0,
    };

    // ==================================================
    constructor(
        indentifersOptions: indentifersOptions,
        identifiersClass: identifiersClass,
        identifiersId: identifiersId,
        identifiersActions: identifiersActions,
        identifiersIcons: IndentifersIcons,
        elementVideo: HTMLVideoElement) {
        this.indentifersOptions = indentifersOptions;
        this.identifiersClass = identifiersClass;
        this.identifiersId = identifiersId;
        this.identifiersActions = identifiersActions;
        this.identifiersIcons = identifiersIcons;
        this.elementVideo = elementVideo;

        //
        this.controlsElements = {
            // Containers
            container: document.getElementById(this.identifiersId.container)! as HTMLDivElement,
            top: document.getElementById(this.identifiersId.top)! as HTMLDivElement,
            middle: document.getElementById(this.identifiersId.middle)! as HTMLButtonElement,
            bottom: document.getElementById(this.identifiersId.bottom)! as HTMLDivElement,
            // Controllers
            playPause: document.querySelectorAll(`button[action="${this.identifiersActions.playPause}"]`)!,
            fullscreen: document.querySelector(`button[action="${this.identifiersActions.fullscreen}"]`)!,
            volume: document.querySelector(`button[action="${this.identifiersActions.volume}"]`)!,
            currentTime: document.querySelector(`p[action="${this.identifiersActions.currentTime}"]`)!,
            durationTime: document.querySelector(`p[action="${this.identifiersActions.durationTime}"]`)!,
            pictureInPicture: document.querySelector(`button[action="${this.identifiersActions.pictureInPicture}"]`)!,
            rangerProguessContainer: document.querySelector(`div[action="${this.identifiersActions.rangerProguessContainer}"]`)!,
            rangerProguessInput: document.querySelector(`input[action="${this.identifiersActions.rangerProguessInput}"]`)!,
            rangerProguessDiv: document.querySelector(`div[action="${this.identifiersActions.rangerProguessDiv}"]`)!,
        }

        // Build
        this.build();
    }

    // Build generate
    private build(): void {
        this.buildBlockRightClick();
        this.buildPrepareVideo();
        this.buildFading();
        this.buildPlayPause();
        this.buildRangerProguess();
        this.buildFullscreen();
        this.buildPictureInPicture();
        this.buildVolume();
        this.buildDurationTime();
        this.buildCurrentTime();
        // 
        this.buildObserver();
    }

    // ==================================================
    private buildBlockRightClick(): void {
        this.elementVideo.addEventListener('contextmenu', (event: MouseEvent) => {
            event.preventDefault();
        });
        this.controlsElements.container.addEventListener('contextmenu', (event: MouseEvent) => {
            event.preventDefault();
        });
        this.controlsElements.top.addEventListener('contextmenu', (event: MouseEvent) => {
            event.preventDefault();
        });
        this.controlsElements.middle.addEventListener('contextmenu', (event: MouseEvent) => {
            event.preventDefault();
        });
        this.controlsElements.bottom.addEventListener('contextmenu', (event: MouseEvent) => {
            event.preventDefault();
        });
    }

    // ==================================================
    private buildPrepareVideo(): void {
        this.elementVideo.removeAttribute('controls');
        this.elementVideo.removeAttribute('height');
        this.elementVideo.removeAttribute('width');
        this.elementVideo.controls = false;
        this.elementVideo.currentTime = this.indentifersOptions.currentTime;
        this.elementVideo.setAttribute('playsinline', '');
        this.elementVideo.setAttribute('preload', 'auto');
        this.elementVideo.setAttribute('controlslist', 'nodownload nofullscreen noremoteplayback');
        // this.elementVideo.setAttribute('disablepictureinpicture', '');
        this.elementVideo.setAttribute('disableremoteplayback', '');
        this.elementVideo.setAttribute('disabledownload', '');
        if (this.indentifersOptions.autoplay) {
            this.elementVideo.setAttribute('autoplay', '');
        } else {
            this.elementVideo.removeAttribute('autoplay');
        }
    }

    // ==================================================
    private buildFading(): void {
        const allContainers: HTMLElement[] = [
            this.controlsElements.top,
            this.controlsElements.middle,
            this.controlsElements.bottom,
        ];

        let hideTimeout: ReturnType<typeof setTimeout> | null = null;

        const hideControls: Function = (): void => {
            if (!this.elementVideo.paused) {
                allContainers.forEach((container) => {
                    container.classList.add(this.identifiersClass.fading);
                    this.controlsElements.container.classList.add(this.identifiersClass.hide);
                });
            }
        };

        const showControls: Function = (): void => {
            allContainers.forEach((container) => {
                container.classList.remove(this.identifiersClass.fading);
                this.controlsElements.container.classList.remove(this.identifiersClass.hide);
            });
            if (hideTimeout) clearTimeout(hideTimeout);
            hideTimeout = setTimeout(hideControls, 2500);
        };

        this.controlsElements.container.addEventListener('mouseleave', (): void => {
            hideControls();
        });

        this.controlsElements.container.addEventListener('mousemove', (): void => {
            showControls();
        });

        showControls();
    };

    // ==================================================
    private buildPlayPause(): void {
        this.elementVideo.addEventListener('pause', (): void => {
            this.controlsValue.playing = false;

            this.controlsElements.playPause.forEach((button) => {
                const svgPath: SVGPathElement | null = button.querySelector('svg > path') as SVGPathElement | null;
                if (svgPath != null) {
                    svgPath.setAttribute('d', this.identifiersIcons.play);
                } else {
                    new IOError('svgPath is not exist');
                }
            });
        });
        this.elementVideo.addEventListener('play', (): void => {
            this.controlsValue.playing = true;

            this.controlsElements.playPause.forEach((button) => {
                const svgPath: SVGPathElement | null = button.querySelector('svg > path') as SVGPathElement | null;
                if (svgPath != null) {
                    svgPath.setAttribute('d', this.identifiersIcons.pause);
                } else {
                    new IOError('svgPath is not exist');
                }
            });
        });
        this.elementVideo.addEventListener('click', (): void => {
            this.playPauseListener();
        });
        this.controlsElements.playPause.forEach((button) => {
            button.addEventListener('click', (): void => {
                this.playPauseListener();
            });
        });
    }

    // ==================================================
    private buildRangerProguess(): void {
        this.controlsElements.rangerProguessInput.oninput = (): void => {
            this.controlsValue.proguess = parseInt(this.controlsElements.rangerProguessInput.value, 10);

            this.rangerProguessDivListener();
            this.elementVideo.currentTime = (this.controlsValue.proguess / 100) * this.controlsValue.durationTime;
        };
    }

    // ==================================================
    private buildFullscreen(): void {
        this.controlsElements.fullscreen.addEventListener('click', (): void => {
            this.fullscreenListener();
        });
    }

    // ==================================================
    private buildPictureInPicture(): void {
        this.controlsElements.pictureInPicture.addEventListener('click', (): void => {
            this.pictureInPictureListener();
        });
    }

    // ==================================================
    private buildVolume(): void {
        this.controlsElements.volume.addEventListener('click', (): void => {
            this.volumeListener();
        });
    }

    // ==================================================
    private buildDurationTime(): void {
        this.elementVideo.addEventListener('loadeddata', (): void => {
            this.controlsValue.duration = this.formatTime(this.elementVideo.duration ?? 0);
            this.controlsValue.durationTime = this.elementVideo.duration ?? 0;

            this.controlsElements.durationTime.innerHTML = this.controlsValue.current;
        });
    }

    // ==================================================
    private buildCurrentTime(): void {
        this.elementVideo.addEventListener('timeupdate', (): void => {
            this.controlsValue.current = this.formatTime(this.elementVideo.currentTime ?? 0);
            this.controlsValue.currentTime = this.elementVideo.currentTime ?? 0;

            this.controlsValue.proguess = (this.controlsValue.currentTime / this.controlsValue.durationTime) * 100;

            this.rangerProguessDivListener();
            this.controlsElements.rangerProguessInput.value = this.controlsValue.proguess.toString();
            this.controlsElements.currentTime.innerHTML = this.controlsValue.current;
        });
    }

    // ==================================================
    private buildObserver(): void {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.elementVideo.currentTime = Math.max(0, Math.min(this.controlsValue.durationTime, this.elementVideo.currentTime - 10));
                    break;
                case ' ':
                    this.playPauseListener();
                    break;
                case 'ArrowRight':
                    this.elementVideo.currentTime = Math.max(0, Math.min(this.controlsValue.durationTime, this.elementVideo.currentTime + 10));
                    break;
                case 'ArrowDown':
                    break;
                case 'ArrowUp':
                    break;
                case 'f':
                    this.fullscreenListener();
                    break;
                case 'p':
                    this.pictureInPictureListener();
                    break;
                case 'm':
                    this.volumeListener();
                    break;
                case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
                    const percentage = parseInt(event.key) * 10;
                    const newTime = (percentage / 100) * this.controlsValue.durationTime;
                    this.elementVideo.currentTime = newTime;

                    this.controlsValue.current = this.formatTime(newTime);
                    this.controlsValue.currentTime = newTime;
                    break;
            }
        });
    };










    // ==================================================
    // Listerners
    private playPauseListener(): void {
        if (this.elementVideo.paused) {
            this.elementVideo.play();
            return;
        }

        this.elementVideo.pause();
    }

    // ==================================================
    private fullscreenListener(): void {
        if (!this.controlsValue.fullscreen) {
            this.controlsValue.fullscreen = true;
            if (this.controlsElements.container.requestFullscreen) {
                this.controlsElements.container.requestFullscreen();
            } else if ((this.controlsElements.container as any).mozRequestFullScreen) {
                (this.controlsElements.container as any).mozRequestFullScreen();
            } else if ((this.controlsElements.container as any).webkitRequestFullScreen) {
                (this.controlsElements.container as any).webkitRequestFullScreen();
            } else if ((this.controlsElements.container as any).msRequestFullscreen) {
                (this.controlsElements.container as any).msRequestFullscreen();
            }
            this.controlsElements.fullscreen.querySelector('svg > path')!.setAttribute('d', this.identifiersIcons.fullscreenOn);
        } else {
            this.controlsValue.fullscreen = false;
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            } else if ((document as any).mozCancelFullScreen) {
                (document as any).mozCancelFullScreen();
            } else if ((document as any).msExitFullscreen) {
                (document as any).msExitFullscreen();
            }
            this.controlsElements.fullscreen.querySelector('svg > path')!.setAttribute('d', this.identifiersIcons.fullscreenOff);
        }
    }

    // ==================================================
    private pictureInPictureListener(): void {
        if (this.elementVideo.requestPictureInPicture) {
            this.elementVideo.requestPictureInPicture();
        }
    }

    // ==================================================
    private volumeListener(): void {
        if (this.elementVideo.muted || this.elementVideo.volume === 0) {
            this.controlsElements.volume.querySelector('svg > path')!.setAttribute('d', this.identifiersIcons.volumeOn);
            this.elementVideo.muted = false;
            this.elementVideo.volume = 1.0;
        } else {
            this.controlsElements.volume.querySelector('svg > path')!.setAttribute('d', this.identifiersIcons.volumeOff);
            this.elementVideo.muted = true;
            this.elementVideo.volume = 0.0;
        }
    }

    // ==================================================
    private rangerProguessDivListener(): void {
        var progress: number = this.controlsValue.proguess;

        if (progress < 25) {
            this.controlsElements.rangerProguessDiv.style.width = `${progress + 0.5}%`;
            return;
        }

        if (progress > 45) {
            this.controlsElements.rangerProguessDiv.style.width = `${progress - 0.5}%`;
            return;
        }

        this.controlsElements.rangerProguessDiv.style.width = `${progress}%`;
    }

    // ==================================================
    // Helpers
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