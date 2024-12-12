import intIdentifiers from "../interfaces/identifiers";
export default class Styles {
    containerStyle: HTMLElement;
    identifiers: intIdentifiers;
    arrayIdentifiers: string[];
    constructor(identifiers: intIdentifiers);
    /**
     * build
    */
    build(): void;
    /**
     * rebuild
    */
    rebuild(): void;
    /**
     * getStyles
    */
    private getStyles;
    /**
     * setStyles
    */
    private setStyles;
    /**
     * addStyles
    */
    private addStyles;
}
