"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const elementVideo = document.getElementById('Web-Video-Player');
    if (elementVideo == null) {
        return;
    }
    let color;
    (function (color) {
        color[color["Red"] = 0] = "Red";
        color[color["Green"] = 1] = "Green";
        color[color["Blue"] = 2] = "Blue";
    })(color || (color = {}));
    function randomHash(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    var red = color.Red;
    console.log(color[red.valueOf()]);
    console.log(randomHash(16));
    console.log(randomHash(16));
});
