class IOError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Error";
    }
}
// ==================================================
interface intAspectRatio {
    horizontal: number;
    vertical: number;
}
// ==================================================
enum styles {
    styles,
    video,
    container,
    buttonsTop,
    buttonsMiddle,
    buttonsBottom,
}
// ==================================================
enum reloaders {
    styles,
    aspectRatio,
    videos,
}
// ==================================================
interface intOptions {
    apply: string,
    aspectRatio: intAspectRatio,
    colorInactive: string,
    colorActive: string,
    compatibility: boolean,
    autoplay: boolean,
    muted: boolean,
}
// ==================================================
interface intIdentifiers {
    styles: string,
    container: string,
    buttonsTop: string,
    buttonsMiddle: string,
    buttonsBottom: string,
}
// ==================================================
class WVP {
    options: intOptions;
    identifiers: intIdentifiers;

    // ==================================================
    constructor(apply: string, options?: Record<string, any>) {
        if (options == undefined) {
            options = {};
        }
        this.options = {
            apply: apply,
            aspectRatio: {
                horizontal: parseInt((options['aspectRatio'] ?? '16:9').split(':')[0]),
                vertical: parseInt((options['aspectRatio'] ?? '16:9').split(':')[1]),
            },
            colorInactive: options['colorInactive'] ?? '#007AFF',
            colorActive: options['colorActive'] ?? '#FFFFFF',
            compatibility: options['compatibility'] ?? false,
            autoplay: options['autoplay'] ?? true,
            muted: options['muted'] ?? true,
        }
        this.identifiers = {
            styles: `styles-${this.randomHash(18)}`,
            container: `container-${this.randomHash(15)}`,
            buttonsTop: `top-${this.randomHash(21)}`,
            buttonsMiddle: `middle-${this.randomHash(18)}`,
            buttonsBottom: `bottom-${this.randomHash(18)}`,
        };
        console.log(this.identifiers);
        this.init([
            reloaders.styles,
            reloaders.aspectRatio,
            reloaders.videos,
        ]);
    }

    // ==================================================
    // Getters
    get aspectRatio(): string {
        return `${this.options.aspectRatio.horizontal}:${this.options.aspectRatio.vertical}`;
    }
    get colorInactive(): string {
        return this.options.colorInactive;
    }
    get colorActive(): string {
        return this.options.colorActive;
    }
    get compatibility(): boolean {
        return this.options.compatibility;
    }
    get autoplay(): boolean {
        return this.options.autoplay;
    }
    get muted(): boolean {
        return this.options.muted;
    }

    // ==================================================
    // Setters
    set aspectRatio(value: string) {
        const tempAspectRatio = {
            horizontal: parseInt(value.split(':')[0]),
            vertical: parseInt(value.split(':')[1]),
        };
        if (this.options.aspectRatio == tempAspectRatio) return;
        this.options.aspectRatio = tempAspectRatio;
        this.init([
            reloaders.aspectRatio,
        ]);
    }
    set colorInactive(value: string) {
        if (this.options.colorInactive == value) return;
        this.options.colorInactive = value;
        this.init([
            reloaders.styles,
        ]);
    }
    set colorActive(value: string) {
        if (this.options.colorActive == value) return;
        this.options.colorActive = value;
        this.init([
            reloaders.styles,
        ]);
    }
    set compatibility(value: boolean) {
        if (this.options.compatibility == value) return;
        this.options.compatibility = value;
        this.init([
            reloaders.styles,
        ]);
    }
    set autoplay(value: boolean) {
        if (this.options.autoplay == value) return;
        this.options.autoplay = value;
        this.init([
            reloaders.videos,
        ]);
    }
    set muted(value: boolean) {
        if (this.options.muted == value) return;
        this.options.muted = value;
        this.init([
            reloaders.videos,
        ]);
    }

    // ==================================================
    private randomHash(length: number): string {
        const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result: string = "";
        for (let i: number = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // ==================================================
    private getStyles(styleId: string, styleMap: Record<string, string>): string {
        var styleString: string;

        styleString = `#${styleId} {`;
        for (const key in styleMap) {
            if (styleMap.hasOwnProperty(key)) {
                if (this.options.compatibility) {
                    styleString += `-moz-${key}: ${styleMap[key]};`;
                    styleString += `-ms-${key}: ${styleMap[key]};`;
                    styleString += `-o-${key}: ${styleMap[key]};`;
                    styleString += `-webkit-${key}: ${styleMap[key]};`;
                }
                styleString += `${key}: ${styleMap[key]};`;
            }
        }
        styleString += '}';

        return styleString;
    }

    // ==================================================
    private setStyles(elementStyle: HTMLElement, stringStyle: string): void {
        elementStyle.innerHTML += stringStyle;
    }

    // ==================================================
    private applyAspectRatio(): void {
        var stylesMap: Record<string, string> = {};

        const elementContainer: HTMLElement = document.getElementById(this.identifiers.container) as HTMLElement;

        var totalWidth: number = elementContainer!.parentElement!.offsetWidth;
        var totalHeight: number = totalWidth * this.options.aspectRatio.vertical / this.options.aspectRatio.horizontal;

        const differenceHeight = totalHeight - window.innerHeight;
        if (differenceHeight > 0) {
            totalWidth = totalWidth - differenceHeight;
            totalHeight = totalHeight - differenceHeight;
        }

        stylesMap['width'] = `${totalWidth}px`;

        const elementStyle: HTMLElement = document.getElementById(this.identifiers.styles) as HTMLElement;

        this.setStyles(elementStyle, this.getStyles(this.identifiers.buttonsTop, stylesMap));
        this.setStyles(elementStyle, this.getStyles(this.identifiers.buttonsBottom, stylesMap));

        stylesMap['top'] = `calc(${totalHeight / 2}px - 3rem);`;
        this.setStyles(elementStyle, this.getStyles(this.identifiers.buttonsMiddle, stylesMap));
        delete stylesMap['top'];

        stylesMap['height'] = `${totalHeight}px`;

        this.setStyles(elementStyle, this.getStyles(this.identifiers.container, stylesMap));
    }

    // ==================================================
    private generateStyles(): void {
        const elementHead: HTMLHeadElement = document.head as HTMLHeadElement;

        const elementStyles: HTMLHeadElement = document.createElement('style');
        elementStyles.setAttribute('type', 'text/css');
        elementStyles.setAttribute('id', this.identifiers.styles);
        elementHead.appendChild(elementStyles);

        const applyStyles: Function = (style: styles, idElementStyle: string): void => {
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

            this.setStyles(elementStyles, this.getStyles(idElementStyle, stylesMap));
        }

        applyStyles(styles.video, this.options.apply);
        applyStyles(styles.container, this.identifiers.container);
        applyStyles(styles.buttonsTop, this.identifiers.buttonsTop);
        applyStyles(styles.buttonsMiddle, this.identifiers.buttonsMiddle);
        applyStyles(styles.buttonsBottom, this.identifiers.buttonsBottom);
    }

    // ==================================================
    private init(reloader: reloaders[]) {
        const elementsVideo: NodeListOf<HTMLVideoElement> | null = document.querySelectorAll(this.options.apply) as NodeListOf<HTMLVideoElement> | null;

        if (elementsVideo == null) return;
        for (let index = 0; index < reloader.length; index++) {
            const load: reloaders = reloader[index];

            switch (load) {
                case reloaders.styles:
                    this.generateStyles();
                    break;
                case reloaders.aspectRatio:
                    this.applyAspectRatio();
                    break;
                case reloaders.videos:
                    break;
            }
        }
        for (let index = 0; index < elementsVideo.length; index++) {
            const elementVideo: HTMLVideoElement = elementsVideo[index];

            console.log(elementVideo.getAttribute(''));
        }

    }
}

