var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.hash = function (length) {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var result = "";
        for (var i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return "WVP-".concat(result);
    };
    return Utils;
}());
export default Utils;
