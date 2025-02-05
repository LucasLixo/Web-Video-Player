// Interfaces
import intIdentifiersId from "../interfaces/identifiers_id";
import intIdentifiersClass from "../interfaces/identifiers_class";
import intActions from "../interfaces/actions";
import intOptions from "../interfaces/options";
import intStyleCompatibility from "../interfaces/style_compatibility";
// Class
import IOError from "../class/io_error";

export default class Styles {
    // ==================================================
    private allStyles: string = '';
    private indexStyles: number = 99;
    private stylesTemp: Record<string, string> = {};

    // ==================================================
    private options: intOptions;
    private identifiersId: intIdentifiersId;
    private identifiersClass: intIdentifiersClass;
    private actions: intActions;

    // ==================================================
    constructor(
        options: intOptions,
        identifiersId: intIdentifiersId,
        identifiersClass: intIdentifiersClass,
        actions: intActions,
    ) {
        this.options = options;
        this.identifiersId = identifiersId;
        this.identifiersClass = identifiersClass;
        this.actions = actions;
    }

    // ==================================================
    // Build
    public build(): void {
        this.buildClass();
        this.buildId();
        this.applyVideo();
        this.buildActions();
        this.buildFading();
        this.buildCursorHide();
        this.setStyles();
    }

    // ==================================================
    private buildClass(): void {
        // Class
        this.classAll();
        this.classButtons();
        this.classIcons();
    }

    // ==================================================
    private buildId(): void {
        // Id
        this.idContainer();
        this.idTop();
        this.idMiddle();
        this.idBottom();
    }

    // ==================================================
    private buildActions(): void {
        // Actions
        this.actionsTime();
        this.actionsRangerProguessContainer();
        this.actionsRangerProguessInput();
        this.actionsRangerProguessProguess();
    }

    // ==================================================
    // Class
    private classAll: Function = (): void => {
        this.stylesTemp = {
            'margin': '0',
            'padding': '0',
            'box-sizing': 'inherit',
            'text-shadow': 'none',
            // 'direction': 'ltr',
        };

        this.addStyles(this.parseStyles(
            `.${this.identifiersClass.all}`,
            this.stylesTemp,
        ));
    }

    // ==================================================
    private classButtons: Function = (): void => {
        this.stylesTemp = {
            'display': 'block',
            'color': 'inherit',
            'border': 'none',
            'padding': '0',
            'margin': '0',
            'font': 'inherit',
            'cursor': 'pointer',
            'outline': 'inherit',
            'touch-action': 'manipulation',
            'flex-shrink': '0',
            'background-color': 'transparent',
        };

        this.addStyles(this.parseStyles(
            `.${this.identifiersClass.buttons}`,
            this.stylesTemp,
        ));
    }

    // ==================================================
    private classIcons: Function = (): void => {
        this.stylesTemp = {
            'display': 'block',
            'margin': 'auto',
            'fill': this.options.style.colorInactive,
            'width': '2rem',
            'height': '2rem',
        };

        this.addStyles(this.parseStyles(
            `.${this.identifiersClass.icons}`,
            this.stylesTemp,
        ));
    }

    // ==================================================
    // apply Video
    private applyVideo: Function = (): void => {
        this.stylesTemp = {
            'display': 'block',
            'width': '100%',
            'height': '100%',
            'z-index': `-${this.indexStyles}`,
            'background-color': this.options.style.backgroundColor,
        };

        this.addStyles(this.parseStyles(
            this.options.apply,
            this.stylesTemp,
        ));
    }

    // ==================================================
    // Id
    private idContainer: Function = (): void => {
        this.stylesTemp = {
            'position': 'relative',
            'display': 'block',
            'max-width': '100%',
            'min-width': '240px',
            'height': 'fit-content',
            'cursor': 'default',
        };

        this.addStyles(this.parseStyles(
            `#${this.identifiersId.container}`,
            this.stylesTemp,
        ));
    }

    // ==================================================
    private idTop: Function = (): void => {
        this.stylesTemp = {
            'position': 'absolute',
            'display': 'block',
            'width': '100%',
            'height': 'fit-content',
            'right': '0',
            'left': '0',
            'top': '0',
            'z-index': this.indexStyles.toString(),
            'padding': '1rem',
            'background-image': 'linear-gradient(to bottom, #00000080, transparent)',
        };

        this.addStyles(this.parseStyles(
            `#${this.identifiersId.top}`,
            this.stylesTemp,
        ));
    }

    // ==================================================
    private idMiddle: Function = (): void => {
        this.stylesTemp = {
            'position': 'absolute',
            'width': '3rem',
            'height': '3rem',
            'top': '50%',
            'left': '50%',
            'z-index': this.indexStyles.toString(),
            'transform': 'translate(-50%, -50%)',
            'background-color': this.options.style.colorActive,
            'border-radius': '100%',
        };

        this.addStyles(this.parseStyles(
            `#${this.identifiersId.middle}`,
            this.stylesTemp,
        ));

        this.addStyles(this.parseStylesMedia(
            `#${this.identifiersId.middle}`,
            [
                { attribute: 'height', valueMax: '2.7rem', valueMiddle: '2.5rem', valueMin: '2.3rem', },
            ]
        ));
    }

    // ==================================================
    private idBottom: Function = (): void => {
        this.stylesTemp = {
            'position': 'absolute',
            'display': 'flex',
            'width': '100%',
            'height': 'fit-content',
            'right': '0',
            'left': '0',
            'bottom': '0',
            'z-index': this.indexStyles.toString(),
            'padding': '1rem',
            'background-image': 'linear-gradient(to top, #00000080, transparent)',
            'flex-direction': 'row',
            'justify-content': 'space-between',
            'align-items': 'center',
        };

        this.addStyles(this.parseStyles(
            `#${this.identifiersId.bottom}`,
            this.stylesTemp,
        ));

        this.addStyles(this.parseStyles(
            `#${this.identifiersId.bottom} button`,
            {
                'margin': '0 0.2rem 0 0.2rem',
            },
        ));

        this.addStyles(this.parseStylesMedia(
            `#${this.identifiersId.bottom} button`,
            [
                { attribute: 'margin', valueMax: '0 0.2rem 0 0.2rem', valueMiddle: '0 0.1rem 0 0.1rem', valueMin: '0 0.1rem 0 0.1rem', },
            ]
        ));

        this.addStyles(this.parseStyles(
            `#${this.actions.rangerProguessContainer}, #${this.actions.currentTime}, #${this.actions.durationTime}`,
            {
                'margin': '0 0.3rem 0 0.3rem',
            },
        ));

        this.addStyles(this.parseStylesMedia(
            `#${this.actions.rangerProguessContainer}, #${this.actions.currentTime}, #${this.actions.durationTime}`,
            [
                { attribute: 'margin', valueMax: '0 0.3rem 0 0.3rem', valueMiddle: '0 0.2rem 0 0.2rem', valueMin: '0 0.1rem 0 0.1rem', },
            ]
        ));
    }

    // ==================================================
    // Actions
    private actionsTime: Function = (): void => {
        this.stylesTemp = {
            'font-family': 'inherit',
            'font-size': '1rem',
            'font-weight': 'bold',
            'color': this.options.style.colorInactive,
        };

        this.addStyles(this.parseStyles(
            `#${this.actions.durationTime}, #${this.actions.currentTime}`,
            this.stylesTemp,
        ));
    }

    // ==================================================
    private actionsRangerProguessContainer: Function = (): void => {
        this.stylesTemp = {
            'position': 'relative',
            'display': 'block',
            'width': '100%',
            'height': 'auto',
            'background-color': 'transparent',
        };

        this.addStyles(this.parseStyles(
            `#${this.actions.rangerProguessContainer}`,
            this.stylesTemp,
        ));

        this.addStyles(this.parseStylesMedia(
            `#${this.actions.rangerProguessContainer}`,
            [
                { attribute: 'height', valueMax: '0.3rem', valueMiddle: '0.3rem', valueMin: '0.2rem', },
            ]
        ));
    }

    // ==================================================
    private actionsRangerProguessInput: Function = (): void => {
        this.stylesTemp = {
            'appearance': 'none',
            'border': 'none',
            'cursor': 'pointer',
            'width': '100%',
            'height': 'auto',
            'background-color': 'transparent',
        };

        this.addStyles(this.parseStyles(
            `#${this.actions.rangerProguessInput}`,
            this.stylesTemp,
        ));

        this.stylesTemp = {
            'appearance': 'none',
            'border': 'none',
            'width': '100%',
            'height': '0.5rem',
            'background-color': this.options.style.colorInactive,
            'border-radius': '0.8rem',
        };

        this.addStyles(this.parseStyles(
            `#${this.actions.rangerProguessInput}::-webkit-slider-runnable-track`,
            this.stylesTemp,
        ));

        this.stylesTemp = {
            'appearance': 'none',
            'border': 'none',
            'width': '0.9rem',
            'height': '0.9rem',
            'background-color': this.options.style.colorActive,
            'border-radius': '50%',
            'margin-top': '-0.2rem',
        };

        this.addStyles(this.parseStyles(
            `#${this.actions.rangerProguessInput}::-webkit-slider-thumb`,
            this.stylesTemp,
        ));
    }

    // ==================================================
    private actionsRangerProguessProguess: Function = (): void => {
        this.stylesTemp = {
            'position': 'absolute',
            'display': 'block',
            'top': '0',
            'left': '0',
            'width': '0%',
            'height': '0.5rem',
            'margin-top': '0.6rem',
            'border-top-left-radius': '0.8rem',
            'border-bottom-left-radius': '0.8rem',
            'border-top-right-radius': '0',
            'border-bottom-right-radius': '0',
            'background-color': this.options.style.colorActive,
            'pointer-events': 'none',
        };

        this.addStyles(this.parseStyles(
            `#${this.actions.rangerProguessProguess}`,
            this.stylesTemp,
        ));
    }

    // ==================================================
    // Fading
    private buildFading: Function = (): void => {
        this.stylesTemp = {
            'transition': 'opacity 0.3s ease, visibility 0.3s ease',
            'opacity': '1',
            'visibility': 'visible',
            'overflow': 'visible',
        };

        this.addStyles(this.parseStyles(
            `#${this.identifiersId.top}, #${this.identifiersId.middle}, #${this.identifiersId.bottom}`,
            this.stylesTemp,
        ));

        this.addStyles(this.parseStyles(
            `.${this.identifiersClass.fading}`,
            {
                'opacity': '0 !important',
                'visibility': 'hidden !important',
                'overflow': 'hidden !important',
            },
        ));
    }

    // ==================================================
    private buildCursorHide: Function = (): void => {
        this.stylesTemp = {
            'cursor': 'none !important',
        };

        this.addStyles(this.parseStyles(
            `.${this.identifiersClass.cursorHide}`,
            this.stylesTemp,
        ));
    }




















    // ==================================================
    private parseStyles(styleId: string, styleMap: Record<string, string>): string {
        var styleString: string = '';

        styleString += `${styleId} {`;
        for (const key in styleMap) {
            if (styleMap.hasOwnProperty(key)) {
                styleString += this.buildStylesCompatibility(key, styleMap[key]);
            }
        }
        styleString += '}';

        return styleString;
    }

    // ==================================================
    private parseStylesMedia(styleId: string, extra: intStyleCompatibility[]): string {
        let styleString: string = '';

        extra.forEach((property) => {
            styleString += `@media (max-width: 480px) {`;
            styleString += `${styleId} { ${property.attribute}: ${property.valueMax}; }`;
            styleString += `}`;
            styleString += `@media (max-width: 360px) {`;
            styleString += `${styleId} { ${property.attribute}: ${property.valueMiddle}; }`;
            styleString += `}`;
            styleString += `@media (max-width: 240px) {`;
            styleString += `${styleId} { ${property.attribute}: ${property.valueMin}; }`;
            styleString += `}`;
        });

        return styleString;
    }

    // ==================================================
    private addStyles(stringStyle: string): void {
        this.allStyles += stringStyle;
    }

    // ==================================================
    private setStyles(): void {
        const headElement: HTMLElement = document.head as HTMLElement;

        const style: HTMLElement = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = this.allStyles;
        headElement.appendChild(style);
    }

    // ==================================================
    private buildStylesCompatibility: Function = (attribute: string, value: string): string => {
        var styleString: string = '';
        if (true) {
            styleString += `-moz-${attribute}: ${value};`;
            styleString += `-ms-${attribute}: ${value};`;
            styleString += `-o-${attribute}: ${value};`;
            // styleString += `-webkit-${attribute}: ${value};`;
        }
        styleString += `${attribute}: ${value};`;
        return styleString;
    }
}