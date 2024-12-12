import intIdentifiers from "../interfaces/identifiers";
import { intOptions } from "../interfaces/options";

export default class Elements {
    // ==================================================
    options: intOptions;
    identifiers: intIdentifiers;

    // ==================================================
    constructor(options: intOptions, identifiers: intIdentifiers) {
        this.options = options;
        this.identifiers = identifiers;
        this.init();
    }

    // ==================================================
    /**
     * init
     */
    private init() {
        const elementVideos: NodeListOf<HTMLVideoElement> = document.querySelectorAll(this.options.apply) as NodeListOf<HTMLVideoElement>;

        if (elementVideos.length === 0) {
            return;
        }

        elementVideos.forEach(elementVideo => {
            elementVideo.removeAttribute('controls');
            elementVideo.addEventListener('loadedmetadata', () => {
                elementVideo.controls = false;
            });

            // Não é necessário console.log(elementVideo.innerHTML) para vídeos
            // Se necessário, pode-se usar outras propriedades, como elementVideo.src, etc.

            const elementContainer: HTMLElement = document.createElement('div');
            const parentElement = elementVideo.parentElement;

            if (parentElement) {
                elementContainer.setAttribute('id', this.identifiers.container);
                parentElement.insertBefore(elementContainer, elementVideo);
                elementContainer.appendChild(elementVideo);

                this.buildButtonsTop(elementContainer);
                this.buildButtonsMiddle(elementContainer);
                this.buildButtonsBottom(elementContainer);
            }
        });
    }

    // ==================================================
    // Top Buttons
    private buildButtonsTop(elementContainer: HTMLElement): void {
        const elementTop: HTMLElement = document.createElement('div');
        elementTop.setAttribute('id', this.identifiers.buttonsTop);
        elementContainer.appendChild(elementTop);
    }

    // ==================================================
    // Middle Buttons
    private buildButtonsMiddle(elementContainer: HTMLElement): void {
        const elementMiddle: HTMLElement = document.createElement('div');
        elementMiddle.setAttribute('id', this.identifiers.buttonsMiddle);
        elementContainer.appendChild(elementMiddle);
    }

    // ==================================================
    // Bottom Buttons
    private buildButtonsBottom(elementContainer: HTMLElement): void {
        const elementBottom: HTMLElement = document.createElement('div');
        elementBottom.setAttribute('id', this.identifiers.buttonsBottom);
        elementContainer.appendChild(elementBottom);
    }
}
