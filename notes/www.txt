class IOError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Error";
    }
}

try {
    // ==================================================
    interface intAspectRatio {
        horizontal: number;
        vertical: number;
    }
    // ==================================================
    interface intIdentifier {
        styles: string,
        video: string,
        container: string,
        buttonsTop: string,
        buttonsMiddle: string,
        buttonsBottom: string,
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
    const randomHash: Function = function (length: number): string {
        const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result: string = "";
        for (let i: number = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // ==================================================
    const getStyles: Function = function (styleId: string, styleMap: Record<string, string>): string {
        var styleString: string;

        styleString = `#${styleId} {`;
        for (const key in styleMap) {
            if (styleMap.hasOwnProperty(key)) {
                // styleString += `-moz-${key}: ${styleMap[key]};`;
                // styleString += `-ms-${key}: ${styleMap[key]};`;
                // styleString += `-o-${key}: ${styleMap[key]};`;
                // styleString += `-webkit-${key}: ${styleMap[key]};`;
                styleString += `${key}: ${styleMap[key]};`;
            }
        }
        styleString += '}';

        return styleString;
    }

    // ==================================================
    const setStyles: Function = function (elementStyle: HTMLElement, stringStyle: string): void {
        elementStyle.innerHTML += stringStyle;
    }

    // ==================================================
    class Elements {
        idStyle: HTMLElement;

        // ==================================================
        public constructor(idStyle: string) {
            this.idStyle = document.getElementById(idStyle)!;
        }

        // ==================================================
        public applyStyles(style: styles, idElementStyle: string): void {
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

            setStyles(this.idStyle, getStyles(idElementStyle, stylesMap));
        }

        // ==================================================
        public applyAspectRatio(identifier: intIdentifier, aspect: intAspectRatio): void {
            var stylesMap: Record<string, string> = {};

            const elementContainer: HTMLElement | null = document.getElementById(identifier.container) as HTMLElement | null;
            if (elementContainer == null) throw new IOError("Error");

            var totalWidth: number = elementContainer!.parentElement!.offsetWidth;
            var totalHeight: number = totalWidth * aspect.vertical / aspect.horizontal;

            const differenceHeight = totalHeight - window.innerHeight;
            if (differenceHeight > 0) {
                totalWidth = totalWidth - differenceHeight;
                totalHeight = totalHeight - differenceHeight;
            }

            stylesMap['width'] = `${totalWidth}px`;

            setStyles(this.idStyle, getStyles(identifier.buttonsTop, stylesMap));
            setStyles(this.idStyle, getStyles(identifier.buttonsBottom, stylesMap));

            stylesMap['top'] = `calc(${totalHeight / 2}px - 3rem);`;
            setStyles(this.idStyle, getStyles(identifier.buttonsMiddle, stylesMap));
            delete stylesMap['top'];

            stylesMap['height'] = `${totalHeight}px`;

            setStyles(this.idStyle, getStyles(identifier.container, stylesMap));
        }
    }

    // ==================================================
    document.addEventListener('DOMContentLoaded', function () {
        console.log(document.currentScript);
        // ==================================================
        const intIdentifiers: intIdentifier = {
            styles: `s-${randomHash(26)}`,
            video: 'WVP',
            container: `c-${randomHash(26)}`,
            buttonsTop: `bt-${randomHash(26)}`,
            buttonsMiddle: `bm-${randomHash(26)}`,
            buttonsBottom: `bb-${randomHash(26)}`,
        };

        // ==================================================
        const elementVideo: HTMLVideoElement | null = document.getElementById(intIdentifiers.video) as HTMLVideoElement | null;
        if (elementVideo == null) throw new IOError("Error");
        elementVideo.removeAttribute('controls');
        elementVideo.addEventListener('loadedmetadata', () => {
            elementVideo.controls = false;
        });

        // ==================================================
        // Create container div
        const elementContainer: HTMLElement = document.createElement('div');
        if (elementVideo.parentElement) {
            elementContainer.setAttribute('id', intIdentifiers.container);
            elementVideo.parentElement.insertBefore(elementContainer, elementVideo);
            elementContainer.appendChild(elementVideo);
        }

        // ==================================================
        const elementStyles: HTMLElement = document.createElement('style');
        elementStyles.setAttribute('type', 'text/css');
        elementStyles.setAttribute('id', intIdentifiers.styles);
        elementContainer.appendChild(elementStyles);

        // ==================================================
        const elements: Elements = new Elements(intIdentifiers.styles);

        // ==================================================
        elements.applyStyles(styles.video, intIdentifiers.video);

        // ==================================================
        const stringAspectRatio: string = elementVideo.getAttribute('aspect-ratio') || '16:9';

        // ==================================================
        const aspectRatio: intAspectRatio = {
            horizontal: parseInt(stringAspectRatio.split(':')[0]),
            vertical: parseInt(stringAspectRatio.split(':')[1]),
        }
        const colorInactive: string = elementVideo.getAttribute('color-inactive') || '#007AFF';
        const colorActive: string = elementVideo.getAttribute('color-active') || '#FFFFFF';

        // ==================================================
        elements.applyStyles(styles.container, intIdentifiers.container);

        // ==================================================
        // Top Buttons
        const elementTop: HTMLElement = document.createElement('div');
        elementContainer.appendChild(elementTop);
        if (elementTop.parentElement) {
            elementTop.setAttribute('id', intIdentifiers.buttonsTop);
            elements.applyStyles(styles.buttonsTop, intIdentifiers.buttonsTop);
        }

        // ==================================================
        // Middle Buttons
        const elementMiddle: HTMLElement = document.createElement('div');
        elementContainer.appendChild(elementMiddle);
        if (elementMiddle.parentElement) {
            elementMiddle.setAttribute('id', intIdentifiers.buttonsMiddle);
            elements.applyStyles(styles.buttonsMiddle, intIdentifiers.buttonsMiddle);
        }

        // ==================================================
        // Bottom Buttons
        const elementBottom: HTMLElement = document.createElement('div');
        elementContainer.appendChild(elementBottom);
        if (elementBottom.parentElement) {
            elementBottom.setAttribute('id', intIdentifiers.buttonsBottom);
            elements.applyStyles(styles.buttonsBottom, intIdentifiers.buttonsBottom);
        }

        // ==================================================
        elements.applyAspectRatio(intIdentifiers, aspectRatio);

        // ==================================================
        elementVideo.volume = 0;
        elementVideo.play();
    });
} catch (error) {
    console.error(error);
}
