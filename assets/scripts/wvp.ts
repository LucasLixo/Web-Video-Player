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
        video: string,
        container: string,
        buttonsTop: string,
        buttonsMiddle: string,
        buttonsBottom: string,
    }

    // ==================================================
    enum styles {
        video,
        container,
        buttonsTop,
        buttonsMiddle,
        buttonsBottom,
    }

    // ==================================================
    class Utils {
        randomHash(length: number): string {
            const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let result: string = "";
            for (let i: number = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        }

        // ==================================================
        getStyles(stylesMap: Record<string, string>): string {
            var stylesString: string = '';

            for (const key in stylesMap) {
                if (stylesMap.hasOwnProperty(key)) {
                    // stylesString += `-moz-${key}: ${stylesMap[key]};`;
                    // stylesString += `-ms-${key}: ${stylesMap[key]};`;
                    // stylesString += `-o-${key}: ${stylesMap[key]};`;
                    // stylesString += `-webkit-${key}: ${stylesMap[key]};`;
                    stylesString += `${key}: ${stylesMap[key]};`;
                }
            }

            return stylesString;
        }
    }

    // ==================================================
    class Elements {
        utils: Utils;

        // ==================================================
        constructor() {
            this.utils = new Utils();
        }

        // ==================================================
        applyStyles(style: styles, idElementStyle: string): void {
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
                    stylesMap['z-index'] = "-999";
                    stylesMap['background-color'] = "black";
                    break;
                case styles.buttonsTop:
                case styles.buttonsMiddle:
                case styles.buttonsBottom:
                    stylesMap['position'] = "absolute";
                    stylesMap['display'] = "flex";
                    stylesMap['height'] = "6rem";
                    stylesMap['right'] = "0";
                    stylesMap['left'] = "0";
                    stylesMap['z-index'] = "999";

                    if (style === styles.buttonsTop) {
                        stylesMap['background-color'] = "#FF000080";
                        stylesMap['top'] = "0";
                    } else if (style === styles.buttonsMiddle) {
                        stylesMap['background-color'] = "#00FF0080";
                        stylesMap['bottom'] = "0";
                    } else if (style === styles.buttonsBottom) {
                        stylesMap['background-color'] = "#0000FF80";
                        stylesMap['bottom'] = "0";
                    }
                    break;
            }


            const elementStyled: HTMLElement | null = document.getElementById(idElementStyle) as HTMLElement | null;
            if (elementStyled == null) throw new IOError("Error");
            if (elementStyled && elementStyled.parentElement) {
                elementStyled.setAttribute('style', this.utils.getStyles(stylesMap));
            }
        }

        // ==================================================
        applyAspectRatio(identifier: intIdentifier, aspect: intAspectRatio): void {
            var stylesMap: Record<string, string> = {};

            const elementContainer: HTMLElement | null = document.getElementById(identifier.container) as HTMLElement | null;
            if (elementContainer == null) throw new IOError("Error");

            let totalWidth: number = elementContainer!.parentElement!.offsetWidth;
            let totalHeight: number = totalWidth * aspect.vertical / aspect.horizontal;

            while (totalHeight > window.innerHeight) {
                totalWidth -= 1;
                totalHeight = totalWidth * aspect.vertical / aspect.horizontal;
            }

            stylesMap['width'] = `${totalWidth}px`;

            const elementTop: HTMLElement | null = document.getElementById(identifier.buttonsTop) as HTMLElement | null;
            if (elementTop == null) throw new IOError("Error");
            elementTop.setAttribute('style', elementTop.getAttribute('style') + this.utils.getStyles(stylesMap));

            const elementMiddle: HTMLElement | null = document.getElementById(identifier.buttonsMiddle) as HTMLElement | null;
            if (elementMiddle == null) throw new IOError("Error");
            elementMiddle.setAttribute('style', elementMiddle.getAttribute('style') + this.utils.getStyles(stylesMap) + `top: calc(${totalHeight / 2}px - 3rem);`);

            const elementBottom: HTMLElement | null = document.getElementById(identifier.buttonsBottom) as HTMLElement | null;
            if (elementBottom == null) throw new IOError("Error");
            elementBottom.setAttribute('style', elementBottom.getAttribute('style') + this.utils.getStyles(stylesMap));

            stylesMap['height'] = `${totalHeight}px`;

            elementContainer.setAttribute('style', elementContainer.getAttribute('style') + this.utils.getStyles(stylesMap));
        }
    }

    // ==================================================
    document.addEventListener('DOMContentLoaded', function () {
        const utils: Utils = new Utils();
        const elements: Elements = new Elements();

        // ==================================================
        const intIdentifiers: intIdentifier = {
            video: 'WVP',
            container: `c-${utils.randomHash(26)}`,
            buttonsTop: `bt-${utils.randomHash(26)}`,
            buttonsMiddle: `bm-${utils.randomHash(26)}`,
            buttonsBottom: `bb-${utils.randomHash(26)}`,
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
        }
        elements.applyStyles(styles.buttonsTop, intIdentifiers.buttonsTop);

        // ==================================================
        // Middle Buttons
        const elementMiddle: HTMLElement = document.createElement('div');
        elementContainer.appendChild(elementMiddle);
        if (elementMiddle.parentElement) {
            elementMiddle.setAttribute('id', intIdentifiers.buttonsMiddle);
        }
        elements.applyStyles(styles.buttonsMiddle, intIdentifiers.buttonsMiddle);

        // ==================================================
        // Bottom Buttons
        const elementBottom: HTMLElement = document.createElement('div');
        elementContainer.appendChild(elementBottom);
        if (elementBottom.parentElement) {
            elementBottom.setAttribute('id', intIdentifiers.buttonsBottom);
        }
        elements.applyStyles(styles.buttonsBottom, intIdentifiers.buttonsBottom);

        // ==================================================
        elements.applyAspectRatio(intIdentifiers, aspectRatio);

        // ==================================================
        elementVideo.volume = 0;
        elementVideo.play();
    });
} catch (error) {
    console.error(error);
}
