import IOError from "./io_error";
import identifiersClass from "../interfaces/indentifers_class";
import identifiersId from "../interfaces/indentifers_id";
import options from "../interfaces/options";
import identifiersActions from "../interfaces/indentifers_actions";
import IndentifersIcons from "../interfaces/indentifers_icons";

export default class IOElements {
    private options: options;
    private identifiersClass: identifiersClass;
    private identifiersId: identifiersId;
    private identifiersActions: identifiersActions;
    private identifiersIcons: IndentifersIcons;

    // ==================================================
    private elementVideo: HTMLVideoElement;
    private elementContainter: HTMLDivElement = document.createElement('div');

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

        this.build();
    }

    // ==================================================
    private build(): void {
        // Container
        this.elementContainter.setAttribute('id', this.identifiersId.container);

        if (this.elementVideo.parentElement == null) {
            new IOError('this.elementVideo.parentElement is null');
        }

        this.elementVideo.parentElement!.insertBefore(this.elementContainter, this.elementVideo);
        this.elementContainter.appendChild(this.elementVideo);

        // Elements
        this.buildTop();
        this.buildMiddle();
        this.buildBottom();
    }

    // ==================================================
    // Build elements
    private buildTop(): void {
        const elementTop: HTMLElement = document.createElement('div');
        elementTop.setAttribute('id', this.identifiersId.top);
        this.elementContainter.appendChild(elementTop);

        if (true) {
            elementTop.innerHTML = '';
        }
    }

    private buildMiddle(): void {
        const elementMiddle: HTMLElement = document.createElement('button');
        elementMiddle.setAttribute('id', this.identifiersId.middle);
        elementMiddle.setAttribute('class', this.identifiersClass.buttons);
        elementMiddle.setAttribute('action', this.identifiersActions.playPause);
        this.elementContainter.appendChild(elementMiddle);

        elementMiddle.innerHTML = this.buildIcon(this.identifiersIcons.play);
    }

    private buildBottom(): void {
        const elementBottom: HTMLElement = document.createElement('div');
        elementBottom.setAttribute('id', this.identifiersId.bottom);
        this.elementContainter.appendChild(elementBottom);

        // Button PlayPause
        const buttonPlayPause: HTMLElement = document.createElement('button');
        buttonPlayPause.setAttribute('class', this.identifiersClass.buttons);
        buttonPlayPause.setAttribute('action', this.identifiersActions.playPause);
        buttonPlayPause.innerHTML = this.buildIcon(this.identifiersIcons.play);
        elementBottom.appendChild(buttonPlayPause);

        // Button Current
        const pCurrent: HTMLElement = document.createElement('p');
        pCurrent.setAttribute('action', this.identifiersActions.currentTime);
        elementBottom.appendChild(pCurrent);

        // Button Ranger Proguess
        const divRangerProguessContainer: HTMLElement = document.createElement('div');
        divRangerProguessContainer.setAttribute('action', this.identifiersActions.rangerProguessContainer);
        elementBottom.appendChild(divRangerProguessContainer);
        
        const divRangerProguessInput: HTMLElement = document.createElement('input');
        divRangerProguessInput.setAttribute('action', this.identifiersActions.rangerProguessInput);
        divRangerProguessInput.setAttribute('type', 'range');
        divRangerProguessInput.setAttribute('value', '0');
        divRangerProguessInput.setAttribute('min', '0');
        divRangerProguessInput.setAttribute('max', '100');
        divRangerProguessContainer.appendChild(divRangerProguessInput);

        const divRangerProguessDiv: HTMLElement = document.createElement('div');
        divRangerProguessDiv.setAttribute('action', this.identifiersActions.rangerProguessDiv);
        divRangerProguessContainer.appendChild(divRangerProguessDiv);

        // Button Duration
        const pDuration: HTMLElement = document.createElement('p');
        pDuration.setAttribute('action', this.identifiersActions.durationTime);
        elementBottom.appendChild(pDuration);

        // Button Volume
        const buttonVolume: HTMLElement = document.createElement('button');
        buttonVolume.setAttribute('class', this.identifiersClass.buttons);
        buttonVolume.setAttribute('action', this.identifiersActions.volume);
        buttonVolume.innerHTML = this.buildIcon(this.identifiersIcons.volumeOn);
        elementBottom.appendChild(buttonVolume);

        // Button PictureInPicture
        const buttonPictureInPicture: HTMLElement = document.createElement('button');
        buttonPictureInPicture.setAttribute('class', this.identifiersClass.buttons);
        buttonPictureInPicture.setAttribute('action', this.identifiersActions.pictureInPicture);
        buttonPictureInPicture.innerHTML = this.buildIcon(this.identifiersIcons.pictureInPicture);
        elementBottom.appendChild(buttonPictureInPicture);

        // Button Fullscren  
        const buttonFullscreen: HTMLElement = document.createElement('button');
        buttonFullscreen.setAttribute('class', this.identifiersClass.buttons);
        buttonFullscreen.setAttribute('action', this.identifiersActions.fullscreen);
        buttonFullscreen.innerHTML = this.buildIcon(this.identifiersIcons.fullscreenOff);
        elementBottom.appendChild(buttonFullscreen);
    }

    // ==================================================
    // Icons
    private buildIcon(pathIcon: string): string {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="${this.identifiersClass.icons}"><path d="${pathIcon}" /></svg>`;
    }
}
