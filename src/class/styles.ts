import { styles } from "../enums/styles";
import intIdentifiers from "../interfaces/identifiers";

export default class Styles {
    containerStyle: HTMLElement;

    // ==================================================
    identifiers: intIdentifiers;
    arrayIdentifiers: string[];

    // ==================================================
    constructor(identifiers: intIdentifiers) {
        this.containerStyle = document.body as HTMLElement;

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
            const identifier = this.arrayIdentifiers[index];

            const style: HTMLElement = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.setAttribute('key', identifier);
            this.containerStyle.appendChild(style);
        }
    }

    // ==================================================
    /**
     * rebuild
    */
    public rebuild() {
        for (let index = 0; index < this.arrayIdentifiers.length; index++) {
            const identifier = this.arrayIdentifiers[index];

            const styleElement = document.querySelector('style[key="' + identifier + '"]');
            styleElement?.remove();
        }

        this.build();
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
    private setStyles(stringStyle: string): void {
    }

    // ==================================================
    /**
     * addStyles
    */
    private addStyles(watchStyle: styles, stringStyle: string): void {
    }
}