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

        this.applyAllStyles(`${this.identifiers.video}, #${this.identifiers.container}, #${this.identifiers.top}, #${this.identifiers.middle}, #${this.identifiers.bottom}`);
        // , #${this.identifiers.icons}
        this.applyVideoStyles(this.identifiers.video);
        this.applyContainerStyles(`#${this.identifiers.container}`);
        this.applyTopStyles(`#${this.identifiers.top}`);
        this.applyMiddleStyles(`#${this.identifiers.middle}`);
        this.applyBottomStyles(`#${this.identifiers.bottom}`);
        this.applyIconsStyles(`#${this.identifiers.icons}`);
    }

    // ==================================================
    /**
     * applyVideoStyles
    */
    private applyAllStyles(identifierElement: string): void {
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
    private applyVideoStyles(identifierElement: string): void {
        const stylesMap: Record<string, string> = {
            'display': 'block',
            'width': '100%',
            'height': '100%',
            'z-index': '-99',
            'background-color': 'black',
        };

        this.setStyles(styles.video, this.parseStyles(identifierElement, stylesMap));
    }

    // ==================================================
    /**
     * applyContainerStyles
    */
    private applyContainerStyles(identifierElement: string): void {
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
    private applyTopStyles(identifierElement: string): void {
        const stylesMap: Record<string, string> = {
            'position': 'absolute',
            'display': 'flex',
            'width': '100%',
            'height': 'fit-content',
            'right': '0',
            'left': '0',
            'top': '0',
            'z-index': '99',
            'flex-direction': 'row',
            'justify-content': 'center',
            'background-color': '#FF000080',
        };

        this.setStyles(styles.top, this.parseStyles(identifierElement, stylesMap));
    }

    // ==================================================
    /**
     * applyMiddleStyles
    */
    private applyMiddleStyles(identifierElement: string): void {
        const stylesMap: Record<string, string> = {
            'position': 'absolute',
            'display': 'block',
            'width': '2rem',
            'height': '2rem',
            'top': '50%',
            'left': '50%',
            'z-index': '99',
            'background': 'none',
            'color': 'inherit',
            'border': 'none',
            'padding': '0',
            'font': 'inherit',
            'cursor': 'pointer',
            'outline': 'inherit',

            'touch-action': 'manipulation',
        };

        this.setStyles(styles.middle, this.parseStyles(identifierElement, stylesMap));
    }

    // ==================================================
    /**
     * applyBottomStyles
    */
    private applyBottomStyles(identifierElement: string): void {
        const stylesMap: Record<string, string> = {
            'position': 'absolute',
            'display': 'flex',
            'width': '100%',
            'height': 'fit-content',
            'right': '0',
            'left': '0',
            'bottom': '0',
            'z-index': '99',
            'flex-direction': 'row',
            'justify-content': 'center',
            'background-color': '#0000FF80',
        };

        this.setStyles(styles.bottom, this.parseStyles(identifierElement, stylesMap));
    }

    // ==================================================
    /**
     * applyIconsStyles
    */
    private applyIconsStyles(identifierElement: string): void {
        const stylesMap: Record<string, string> = {
            'width': '100%',
            'height': '100%',
        };

        this.setStyles(styles.bottom, this.parseStyles(identifierElement, stylesMap));
    }

    // ==================================================
    /**
     * parseStyles
    */
    private parseStyles(styleId: string, styleMap: Record<string, string>, compatibility: boolean = true): string {
        var styleString: string;

        styleString = `${styleId} {`;
        for (const key in styleMap) {
            if (styleMap.hasOwnProperty(key)) {
                if (compatibility) {
                    styleString += `-moz-${key}: ${styleMap[key]};`;
                    styleString += `-ms-${key}: ${styleMap[key]};`;
                    styleString += `-o-${key}: ${styleMap[key]};`;
                    // styleString += `-webkit-${key}: ${styleMap[key]};`;
                }
                styleString += `${key}: ${styleMap[key]};`;
            }
        }
        styleString += '}';

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