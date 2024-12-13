import intIdentifiers from "../interfaces/identifiers";
import { intOptions } from "../interfaces/options";
import intButtons from "../interfaces/buttons";
import Controls from "./controls";

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
    private pathFullscreenOn: string = 'M200-200v-193h60v133h133v60H200Zm0-367v-193h193v60H260v133h-60Zm367 367v-60h133v-133h60v193H567Zm133-367v-133H567v-60h193v193h-60Z';
    private pathFullscreenOff: string = 'M333-200v-133H200v-60h193v193h-60Zm234 0v-193h193v60H627v133h-60ZM200-567v-60h133v-133h60v193H200Zm367 0v-193h60v133h133v60H567Z';
    private pathForward10: string = 'M360 746V534h-54v-49h104v261h-50Zm147 0q-18.7 0-31.35-12.65Q463 720.7 463 702V529q0-18.7 12.65-31.35Q488.3 485 507 485h83q18.7 0 31.35 12.65Q634 510.3 634 529v173q0 18.7-12.65 31.35Q608.7 746 590 746h-83Zm6-50h71V534h-71v162Zm-33 280q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616q0-75 28-140.5T225 361q49-49 114.5-77T480 256h21l-78-78 41-41 147 147-147 147-41-41 74-74h-17q-125.357 0-212.679 87.321Q180 490.643 180 616t87.321 212.679Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616h60q0 75-28 140.5T735 871q-49 49-114.5 77T480 976Z';
    private pathForward30: string = 'M281 746v-50h121v-56h-82v-49h82v-57H281v-49h127q18.7 0 31.35 12.65Q452 510.3 452 529v173q0 18.7-12.65 31.35Q426.7 746 408 746H281Zm272 0q-18.7 0-31.35-12.65Q509 720.7 509 702V529q0-18.7 12.65-31.35Q534.3 485 553 485h83q18.7 0 31.35 12.65Q680 510.3 680 529v173q0 18.7-12.65 31.35Q654.7 746 636 746h-83Zm6-50h71V534h-71v162Zm-79 280q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616q0-75 28-140.5T225 361q49-49 114.5-77T480 256h21l-78-78 41-41 147 147-147 147-41-41 74-74h-17q-125.357 0-212.679 87.321Q180 490.643 180 616t87.321 212.679Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616h60q0 75-28 140.5T735 871q-49 49-114.5 77T480 976Z';
    private pathReplay10: string = 'M480 976q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616h60q0 125 87.321 212.5Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616t-85-212.679Q610 316 485 316h-22l73 73-42 42-147-147 147-147 41 41-78 78h23q75 0 140.5 28T735 361q49 49 77 114.5T840 616q0 75-28 140.5T735 871q-49 49-114.5 77T480 976ZM360 746V534h-54v-49h104v261h-50Zm147 0q-18.7 0-31.35-12.65Q463 720.7 463 702V529q0-18.7 12.65-31.35Q488.3 485 507 485h83q18.7 0 31.35 12.65Q634 510.3 634 529v173q0 18.7-12.65 31.35Q608.7 746 590 746h-83Zm6-50h71V534h-71v162Z';
    private pathReplay30: string = 'M480 976q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616h60q0 125 87.321 212.5Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616t-85-212.679Q610 316 485 316h-22l73 73-42 42-147-147 147-147 41 41-78 78h23q75 0 140.5 28T735 361q49 49 77 114.5T840 616q0 75-28 140.5T735 871q-49 49-114.5 77T480 976ZM281 746v-50h121v-55h-82v-50h82v-56H281v-50h127q18.7 0 31.35 12.65Q452 510.3 452 529v173q0 18.7-12.65 31.35Q426.7 746 408 746H281Zm272 0q-18.7 0-31.35-12.65Q509 720.7 509 702V529q0-18.7 12.65-31.35Q534.3 485 553 485h83q18.7 0 31.35 12.65Q680 510.3 680 529v173q0 18.7-12.65 31.35Q654.7 746 636 746h-83Zm6-50h71V535h-71v161Z';
    private pathPause: string = 'M370 736h60V416h-60v320Zm160 0h60V416h-60v320Zm-50 240q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z';
    private pathPlay: string = 'M320-200v-560l440 280-440 280Z';
    private pathPicture: string = 'M405-274h361v-258H405v258ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z';
    private pathVolumeOn: string = 'M560-131v-62q97-28 158.5-107.5T780-481q0-101-61-181T560-769v-62q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm420 48v-337q55 17 87.5 64T660-480q0 57-33 104t-87 64ZM420-648 307-540H180v120h127l113 109v-337Zm-94 168Z';
    private pathVolumeOff: string = 'M813-56 681-188q-28 20-60.5 34.5T553-131v-62q23-7 44.5-15.5T638-231L473-397v237L273-360H113v-240h156L49-820l43-43 764 763-43 44Zm-36-232-43-43q20-34 29.5-71.923T773-481q0-103.322-60-184.661T553-769v-62q124 28 202 125.5T833-481q0 51-14 100t-42 93ZM643-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T643-422ZM473-592 369-696l104-104v208Zm-60 286v-150l-84-84H173v120h126l114 114Zm-42-192Z';

    // ==================================================
    /**
     * init
     */
    private init() {
        const elementVideos: NodeListOf<HTMLVideoElement> = document.querySelectorAll(this.options.apply) as NodeListOf<HTMLVideoElement>;

        if (elementVideos.length === 0) {
            return;
        }

        for (let index = 0; index < elementVideos.length; index++) {
            const elementVideo = elementVideos[index];

            const elementContainer: HTMLElement = document.createElement('div');
            const parentElement: HTMLElement = elementVideo.parentElement as HTMLElement;

            if (parentElement) {
                elementContainer.setAttribute('id', this.identifiers.container);
                parentElement.insertBefore(elementContainer, elementVideo);
                elementContainer.appendChild(elementVideo);

                this.buildTop(elementContainer);
                this.buildMiddle(elementContainer, index);
                this.buildBottom(elementContainer);
            }

            const buttons: intButtons = {
                playPause: document.querySelector('button[key="' + `${this.identifiers.middle}__${index}` + '"]') as HTMLElement,
            }
            
            new Controls(elementVideo, index, buttons);
        }
    }

    // ==================================================
    // Top Buttons
    private buildTop(elementContainer: HTMLElement): void {
        const elementTop: HTMLElement = document.createElement('div');
        elementTop.setAttribute('id', this.identifiers.top);
        elementContainer.appendChild(elementTop);
    }

    // ==================================================
    // Middle Buttons
    private buildMiddle(elementContainer: HTMLElement, index: number): void {
        const elementMiddle: HTMLElement = document.createElement('button');
        elementMiddle.setAttribute('id', this.identifiers.middle);
        elementMiddle.setAttribute('key', `${this.identifiers.middle}__${index}`);
        elementContainer.appendChild(elementMiddle);

        elementMiddle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" id="${this.identifiers.icons}"><path d="${this.pathPlay}" /></svg>`;
    }

    // ==================================================
    // Bottom Buttons
    private buildBottom(elementContainer: HTMLElement): void {
        const elementBottom: HTMLElement = document.createElement('div');
        elementBottom.setAttribute('id', this.identifiers.bottom);
        elementContainer.appendChild(elementBottom);
    }
}
