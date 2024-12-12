import { styles } from "../enums/styles";
import intAspectRatio from "../interfaces/aspect_ratio";
import intIdentifiers from "../interfaces/identifiers";
import IOError from "./io_error";

export default class Styles {
    containerStyle: HTMLElement;

    // ==================================================
    aspectRatio:intAspectRatio ;

    identifiers: intIdentifiers;
    arrayIdentifiers: string[];

    // ==================================================
    constructor(aspectRatio: intAspectRatio, identifiers: intIdentifiers) {
        this.containerStyle = document.head as HTMLElement;

        this.aspectRatio = aspectRatio;

        this.identifiers = identifiers;
        this.arrayIdentifiers = [
            this.identifiers.video,
            this.identifiers.container,
            this.identifiers.buttonsTop,
            this.identifiers.buttonsMiddle,
            this.identifiers.buttonsBottom,
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
        this.applyDefaultStyles(styles.video, this.identifiers.video);
        this.applyDefaultStyles(styles.container, `#${this.identifiers.container}`);
        this.applyDefaultStyles(styles.buttonsTop, `#${this.identifiers.buttonsTop}`);
        this.applyDefaultStyles(styles.buttonsMiddle, `#${this.identifiers.buttonsMiddle}`);
        this.applyDefaultStyles(styles.buttonsBottom, `#${this.identifiers.buttonsBottom}`);
        this.applyAspectRatio();
    }

    // ==================================================
    /**
     * rebuild
    */
    public rebuild() {
        for (let index = 0; index < this.arrayIdentifiers.length; index++) {
            const identifier: string = this.arrayIdentifiers[index];

            const styleElement: HTMLElement | null = document.querySelector('style[key="' + identifier + '"]') as HTMLElement | null;
            if (styleElement == null) {
                new IOError("Error: " + 'style[key="' + identifier + '"]' + " doesn't exist!");
            }
            styleElement?.remove();
        }

        this.build();
    }

    // ==================================================
    /**
     * applyDefaultStyles
    */
    private applyDefaultStyles(style: styles, identifierElement: string): void {
        var stylesMap: Record<string, string> = {};

        switch (style) {
            case styles.container:
                stylesMap['position'] = "relative";
                stylesMap['display'] = "flex";
                stylesMap['flex-direction'] = "column";
                break;
            case styles.video:
                stylesMap['position'] = "absolute";
                stylesMap['display'] = "block";
                stylesMap['width'] = "100%";
                stylesMap['height'] = "100%";
                stylesMap['z-index'] = "-99";
                stylesMap['background-color'] = "black";
                break;
            case styles.buttonsTop:
            case styles.buttonsMiddle:
            case styles.buttonsBottom:
                stylesMap['position'] = "absolute";
                stylesMap['display'] = "flex";
                stylesMap['right'] = "0";
                stylesMap['left'] = "0";
                stylesMap['z-index'] = "99";
                stylesMap['flex-direction'] = "row";
                stylesMap['justify-content'] = "center";
                stylesMap['width'] = "100%";
                if (style === styles.buttonsTop) {
                    stylesMap['background-color'] = "#FF000080";
                    stylesMap['top'] = "0";
                    stylesMap['align-items'] = "flex-end";
                    stylesMap['min-height'] = "2rem";
                    stylesMap['max-height'] = "6rem";
                } else if (style === styles.buttonsMiddle) {
                    stylesMap['background-color'] = "#00FF0080";
                    stylesMap['align-items'] = "center";
                    stylesMap['height'] = "6rem";
                } else if (style === styles.buttonsBottom) {
                    stylesMap['background-color'] = "#0000FF80";
                    stylesMap['bottom'] = "0";
                    stylesMap['align-items'] = "flex-start";
                    stylesMap['min-height'] = "2rem";
                    stylesMap['max-height'] = "6rem";
                }
                break;
        }

        this.setStyles(style, this.getStyles(identifierElement, stylesMap));
    }

    // ==================================================
    /**
     * getStyles
    */
    private getStyles(styleId: string, styleMap: Record<string, string>, compatibility: boolean = false): string {
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

    // ==================================================
    private applyAspectRatio: Function = (): void => {
        var stylesMap: Record<string, string> = {};

        const elementContainer: HTMLElement | null = document.getElementById(this.identifiers.container) as HTMLElement | null;
        if (elementContainer == null) throw new IOError("Error");

        var totalWidth: number = elementContainer!.parentElement!.offsetWidth;
        var totalHeight: number = totalWidth * this.aspectRatio.vertical / this.aspectRatio.horizontal;

        const differenceHeight = totalHeight - window.innerHeight;
        if (differenceHeight > 0) {
            totalWidth = totalWidth - differenceHeight;
            totalHeight = totalHeight - differenceHeight;
        }

        stylesMap['width'] = `${totalWidth}px`;

        this.addStyles(styles.buttonsTop, this.getStyles(`#${this.identifiers.buttonsTop}`, stylesMap));
        this.addStyles(styles.buttonsBottom, this.getStyles(`#${this.identifiers.buttonsBottom}`, stylesMap));

        stylesMap['top'] = `calc(${totalHeight / 2}px - 3rem);`;
        this.addStyles(styles.buttonsMiddle, this.getStyles(`#${this.identifiers.buttonsMiddle}`, stylesMap));
        delete stylesMap['top'];

        stylesMap['height'] = `${totalHeight}px`;

        this.addStyles(styles.container, this.getStyles(`#${this.identifiers.container}`, stylesMap));
    }
}