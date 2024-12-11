"use strict";
class IOError extends Error {
    constructor(message) {
        super(message);
        this.name = "Error";
    }
}
// ==================================================
class Utils {
    constructor() {
    }
    randomHash(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}
// ==================================================
try {
    document.addEventListener('DOMContentLoaded', function () {
        const elementVideo = document.getElementById('Web-Video-Player');
        if (elementVideo == null)
            return;
        elementVideo.removeAttribute('controls');
        elementVideo.addEventListener('loadedmetadata', () => {
            elementVideo.controls = false;
        });
        // ==================================================
        const stringAspectRation = elementVideo.getAttribute('aspect-ratio') || '16:9';
        // ==================================================
        const aspectRation = {
            horizontal: parseInt(stringAspectRation.split(':')[0]),
            vertical: parseInt(stringAspectRation.split(':')[1]),
        };
        const colorInactive = elementVideo.getAttribute('color-inactive') || '#007AFF';
        const colorActive = elementVideo.getAttribute('color-active') || '#FFFFFF';
        // ==================================================
        const utils = new Utils();
        let color;
        (function (color) {
            color[color["Red"] = 0] = "Red";
            color[color["Green"] = 1] = "Green";
            color[color["Blue"] = 2] = "Blue";
        })(color || (color = {}));
        // ==================================================
        var red = color.Red;
        console.log(color[red.valueOf()]);
        // console.log(ultils.randomHash(16));
        // console.log(ultils.randomHash(16));
    });
}
catch (error) {
    // throw new IOError("Error");
    console.error(error);
}
