"./interfaces/options";

// build/class/utils.js
var Utils = function() {
  function Utils2() {
  }
  Utils2.prototype.hash = function(length) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  return Utils2;
}();
var utils_default = Utils;

// build/wvp.js
var WVP = function() {
  function WVP2(apply, options) {
    var _a, _b, _c, _d, _e, _f, _g;
    this.utils = new utils_default();
    if (options == void 0) {
      options = {};
    }
    this.options = {
      apply: apply,
      aspectRatio: {
        horizontal: parseInt(((_a = options["aspectRatio"]) !== null && _a !== void 0 ? _a : "16:9").split(":")[0]),
        vertical: parseInt(((_b = options["aspectRatio"]) !== null && _b !== void 0 ? _b : "16:9").split(":")[1])
      },
      colorInactive: (_c = options["colorInactive"]) !== null && _c !== void 0 ? _c : "#007AFF",
      colorActive: (_d = options["colorActive"]) !== null && _d !== void 0 ? _d : "#FFFFFF",
      compatibility: (_e = options["compatibility"]) !== null && _e !== void 0 ? _e : false,
      autoplay: (_f = options["autoplay"]) !== null && _f !== void 0 ? _f : true,
      muted: (_g = options["muted"]) !== null && _g !== void 0 ? _g : true
    };
    this.identifiers = {
      styles: "styles-".concat(this.utils.hash(18)),
      container: "container-".concat(this.utils.hash(15)),
      buttonsTop: "top-".concat(this.utils.hash(21)),
      buttonsMiddle: "middle-".concat(this.utils.hash(18)),
      buttonsBottom: "bottom-".concat(this.utils.hash(18))
    };
    console.log(this.identifiers);
  }
  Object.defineProperty(WVP2.prototype, "colorInactive", {
    get: function() {
      return this.options.colorInactive;
    },
    set: function(value) {
      if (this.options.colorInactive == value)
        return;
      this.options.colorInactive = value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WVP2.prototype, "colorActive", {
    get: function() {
      return this.options.colorActive;
    },
    set: function(value) {
      if (this.options.colorActive == value)
        return;
      this.options.colorActive = value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WVP2.prototype, "autoplay", {
    get: function() {
      return this.options.autoplay;
    },
    set: function(value) {
      if (this.options.autoplay == value)
        return;
      this.options.autoplay = value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(WVP2.prototype, "muted", {
    get: function() {
      return this.options.muted;
    },
    set: function(value) {
      if (this.options.muted == value)
        return;
      this.options.muted = value;
    },
    enumerable: false,
    configurable: true
  });
  return WVP2;
}();
//# sourceMappingURL=wvp.js.map
