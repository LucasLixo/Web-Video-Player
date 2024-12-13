import intButtons from "../interfaces/buttons";

export default class Controls {
    // ==================================================
    elementVideo: HTMLVideoElement;
    buttons: intButtons;

    // ==================================================
    constructor(elementVideo: HTMLVideoElement, index: number, buttons: intButtons) {
        this.elementVideo = elementVideo;
        this.buttons = buttons;

        elementVideo.removeAttribute('controls');
        elementVideo.addEventListener('loadedmetadata', () => {
            elementVideo.controls = false;
        });

        // Enable
        this.buttons.playPause.addEventListener('click', this.togglePlayPause);
    }

    // ==================================================
    private togglePlayPause() :void {
        if (this.elementVideo.paused) {
            this.elementVideo.play();
        } else {
            this.elementVideo.pause();
        }
        console.log('togglePlayPause');
    }
}