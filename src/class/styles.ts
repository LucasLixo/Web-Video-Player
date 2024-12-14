import { styles } from "../enums/styles";
import intIdentifiers from "../interfaces/identifiers";
import { intOptions } from "../interfaces/options";
import IOError from "./io_error";

export default class Styles {
    containerStyle: HTMLElement;

    // ==================================================
    options: intOptions;
    identifiers: intIdentifiers;

    arrayIdentifiers: string[];

    // ==================================================
    constructor(options: intOptions, identifiers: intIdentifiers) {
        this.containerStyle = document.head as HTMLElement;

        this.identifiers = identifiers;
        this.options = options;

        this.arrayIdentifiers = [
            this.identifiers.all,
            this.identifiers.video,
            this.identifiers.container,
            this.identifiers.top,
            this.identifiers.middle,
            this.identifiers.bottom,
            this.identifiers.duration,
            this.identifiers.rangerVolume,
            this.identifiers.icons,
            this.identifiers.buttons,
        ];
    }

    // ==================================================
    /**
     * build
    */
    public build(): void {
        for (let index = 0; index < this.arrayIdentifiers.length; index++) {
            const identifier: string = this.arrayIdentifiers[index];

            const style: HTMLElement = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.setAttribute('key', identifier);
            this.containerStyle.appendChild(style);
        }

        this.applyAllStyles();
        this.applyVideoStyles();
        this.applyContainerStyles();
        this.applyTopStyles();
        this.applyMiddleStyles();
        this.applyBottomStyles();
        this.applyDurationStyles();
        this.applyRangerVolumeStyles();
        this.applyRangerProguessStyles();
        this.applyRangerProguessPointStyles();
        this.applyIconsStyles();
        this.applyButtonStyles();
    }

    // ==================================================
    /**
     * applyVideoStyles
    */
    private applyAllStyles(): void {
        const identifierElement: string = `${this.identifiers.video}, #${this.identifiers.container}, #${this.identifiers.top}, #${this.identifiers.middle}, #${this.identifiers.bottom}`;

        const stylesMap: Record<string, string> = {
            'margin': '0',
            'padding': '0',
            'box-sizing': 'inherit',
            'text-shadow': 'none',
            'direction': 'ltr',
        };

        this.setStyles(styles.all, this.parseStyles(identifierElement, stylesMap));
    }

    // ==================================================
    /**
     * applyVideoStyles
    */
    private applyVideoStyles(): void {
        const identifierElement: string = this.identifiers.video;

        const stylesMap: Record<string, string> = {
            'display': 'block',
            'width': '100%',
            'height': '100%',
            'z-index': '-99',
            'background-color': this.options.backgroundColor,
        };

        this.setStyles(styles.video, this.parseStyles(identifierElement, stylesMap));
    }

    // ==================================================
    /**
     * applyContainerStyles
    */
    private applyContainerStyles(): void {
        const identifierElement: string = `#${this.identifiers.container}`;

        const stylesMap: Record<string, string> = {
            'position': 'relative',
            'display': 'block',
            'max-width': '100%',
            'min-width': '240px',
            'height': 'fit-content',
        };

        this.setStyles(styles.container, this.parseStyles(identifierElement, stylesMap));
    }

    // ==================================================
    /**
     * applyTopStyles
    */
    private applyTopStyles(): void {
        const identifierElement: string = `#${this.identifiers.top}`;

        const stylesMap: Record<string, string> = {
            'position': 'absolute',
            'display': 'block',
            'width': '100%',
            'height': 'fit-content',
            'right': '0',
            'left': '0',
            'top': '0',
            'z-index': '99',
            'padding': '1rem',
            'background': 'linear-gradient(to bottom, black, transparent)',
        };

        this.setStyles(styles.top, this.parseStyles(identifierElement, stylesMap));
    }

    // ==================================================
    /**
     * applyMiddleStyles
    */
    private applyMiddleStyles(): void {
        const identifierElement: string = `#${this.identifiers.middle}`;

        const stylesMap: Record<string, string> = {
            'position': 'absolute',
            'width': '3rem',
            'height': '3rem',
            'top': '50%',
            'left': '50%',
            'z-index': '99',
            'transform': 'translate(-50%, -50%)',
            'background': this.options.colorActive,
            'border-radius': '100%',
        };

        this.setStyles(styles.middle, this.parseStyles(identifierElement, stylesMap));

        this.addStyles(styles.middle, this.parseStyles(`${identifierElement}`, {
            'height': '2.7rem',
        }, {
            before: '@media (max-width: 480px) {',
            after: '}',
        }));

        this.addStyles(styles.middle, this.parseStyles(`${identifierElement}`, {
            'height': '2.5rem',
        }, {
            before: '@media (max-width: 360px) {',
            after: '}',
        }));
    }

    // ==================================================
    /**
     * applyBottomStyles
    */
    private applyBottomStyles(): void {
        const identifierElement: string = `#${this.identifiers.bottom}`;

        const stylesMap: Record<string, string> = {
            'position': 'absolute',
            'display': 'flex',
            'width': '100%',
            'height': 'fit-content',
            'right': '0',
            'left': '0',
            'bottom': '0',
            'z-index': '99',
            'padding': '1rem',
            'background': 'linear-gradient(to top, black, transparent)',
            'flex-direction': 'row',
            'justify-content': 'space-between',
            'align-items': 'center',
        };

        this.setStyles(styles.bottom, this.parseStyles(identifierElement, stylesMap));

        this.addStyles(styles.bottom, this.parseStyles(`${identifierElement}`, {
            'height': '1.7rem',
        }, {
            before: '@media (max-width: 480px) {',
            after: '}',
        }));

        this.addStyles(styles.bottom, this.parseStyles(`${identifierElement}`, {
            'height': '1.5rem',
        }, {
            before: '@media (max-width: 360px) {',
            after: '}',
        }));

        this.addStyles(styles.bottom, this.parseStyles(`${identifierElement} button, ${identifierElement} p`, {
            'margin-left': '0.3rem',
            'margin-right': '0.3rem',
        }));

        this.addStyles(styles.bottom, this.parseStyles(`${identifierElement} button, ${identifierElement} p`, {
            'margin-left': '0.2rem',
            'margin-right': '0.2rem',
        }, {
            before: '@media (max-width: 480px) {',
            after: '}',
        }));

        this.addStyles(styles.bottom, this.parseStyles(`${identifierElement} button, ${identifierElement} p`, {
            'margin-left': '0.1rem',
            'margin-right': '0.1rem',
        }, {
            before: '@media (max-width: 360px) {',
            after: '}',
        }));
    }

    // ==================================================
    /**
     * applyDurationStyles
    */
    private applyDurationStyles(): void {
        const identifierElement: string = `#${this.identifiers.duration}`;

        const stylesMap: Record<string, string> = {
            'font-family': 'inherit',
            'font-size': '2.5rem',
            'font-weight': 'bold',
        };
        this.setStyles(styles.duration, this.parseStyles(identifierElement, stylesMap));
    }

    // ==================================================
    /**
     * applyRangerVolumeStyles
    */
    private applyRangerVolumeStyles(): void {
        const identifierElement: string = `#${this.identifiers.rangerVolume}`;

        const stylesMap: Record<string, string> = {
            'position': 'relative',
            'display': 'block',
            'width': '100%',
            'height': '0.5rem',
            'background': '#CBCBCB',
            'border-radius': '1rem',
            'cursor': 'pointer',
            'overflow': 'visible',
        };
        this.setStyles(styles.rangerVolume, this.parseStyles(identifierElement, stylesMap));

        this.addStyles(styles.rangerVolume, this.parseStyles(`${identifierElement}`, {
            'height': '0.4rem',
        }, {
            before: '@media (max-width: 480px) {',
            after: '}',
        }));

        this.addStyles(styles.rangerVolume, this.parseStyles(`${identifierElement}`, {
            'height': '0.3rem',
        }, {
            before: '@media (max-width: 360px) {',
            after: '}',
        }));
    }

    // ==================================================
    /**
     * applyRangerProguessStyles
    */
    private applyRangerProguessStyles(): void {
        const identifierElement: string = `#${this.identifiers.rangerProguess}`;

        const stylesMap: Record<string, string> = {
            'position': 'absolute',
            'top': '0',
            'bottom': '0',
            'left': '0',
            'display': 'block',
            'width': '33%',
            'height': '100%',
            'border-radius': '1rem',
            'background': this.options.colorActive,
            'cursor': 'pointer',
            'pointer-events': 'none',
            'transition': 'width 0.1s linear',
        };
        this.addStyles(styles.rangerVolume, this.parseStyles(identifierElement, stylesMap));
    }

    // ==================================================
    /**
     * applyRangerProguessPointStyles
    */
    private applyRangerProguessPointStyles(): void {
        const identifierElement: string = `#${this.identifiers.rangerProguessPoint}`;

        const stylesMap: Record<string, string> = {
            'position': 'absolute',
            'display': 'block',
            'top': '0',
            'bottom': '0',
            'transform': 'translate(0%, -25%)',
            'left': 'calc(33% - 1%)',
            'width': '1.2rem',
            'height': '1.2rem',
            'background': this.options.colorInactive,
            'border-radius': '100%',
            'cursor': 'pointer',
            'pointer-events': 'none',
            'z-index': '99',
        };
        this.addStyles(styles.rangerVolume, this.parseStyles(identifierElement, stylesMap));
    }

    // ==================================================
    /**
     * applyButtonStyles
    */
    private applyButtonStyles(): void {
        const identifierElement: string = `.${this.identifiers.buttons}`;

        const stylesMap: Record<string, string> = {
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
            'background': 'transparent',
        };

        this.setStyles(styles.buttons, this.parseStyles(identifierElement, stylesMap));
    }

    // ==================================================
    /**
     * applyIconsStyles
    */
    private applyIconsStyles(): void {
        const identifierElement: string = `#${this.identifiers.icons}`;

        const stylesMap: Record<string, string> = {
            'display': 'block',
            'margin': 'auto',
            'fill': this.options.colorInactive,
            'width': '2rem',
            'height': '2rem',
        };

        this.setStyles(styles.icons, this.parseStyles(identifierElement, stylesMap));
    }

    // ==================================================
    /**
     * parseStyles
    */
    private parseStyles(styleId: string, styleMap: Record<string, string>, extra?: {
        before: string,
        after: string,
    }): string {
        var styleString: string = '';

        if (extra) {
            styleString += extra.before;
        }
        styleString += `${styleId} {`;
        for (const key in styleMap) {
            if (styleMap.hasOwnProperty(key)) {
                if (true) {
                    styleString += `-moz-${key}: ${styleMap[key]};`;
                    styleString += `-ms-${key}: ${styleMap[key]};`;
                    styleString += `-o-${key}: ${styleMap[key]};`;
                    // styleString += `-webkit-${key}: ${styleMap[key]};`;
                }
                styleString += `${key}: ${styleMap[key]};`;
            }
        }
        styleString += '}';
        if (extra) {
            styleString += extra.after;
        }

        return styleString;
    }

    // ==================================================
    /**
     * setStyles
    */
    private setStyles(watchStyle: styles, stringStyle: string): void {
        const identifier: string = this.arrayIdentifiers[watchStyle];

        const styleElement: HTMLElement | null = document.querySelector('style[key="' + identifier + '"]') as HTMLElement | null;
        if (styleElement == null) {
            new IOError("Error: " + 'style[key="' + identifier + '"]' + " doesn't exist!");
        }
        styleElement!.innerHTML = stringStyle;
    }

    // ==================================================
    /**
     * addStyles
    */
    private addStyles(watchStyle: styles, stringStyle: string): void {
        const identifier: string = this.arrayIdentifiers[watchStyle];

        const styleElement: HTMLElement | null = document.querySelector('style[key="' + identifier + '"]') as HTMLElement | null;
        if (styleElement == null) {
            new IOError("Error: " + 'style[key="' + identifier + '"]' + " doesn't exist!");
        }
        styleElement!.innerHTML += stringStyle;
    }
}