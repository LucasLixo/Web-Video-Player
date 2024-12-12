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
    return "WVP-".concat(result);
  };
  return Utils2;
}();
var utils_default = Utils;

// build/class/elements.js
var Elements = function() {
  function Elements2(options, identifiers) {
    this.options = options;
    this.identifiers = identifiers;
    this.init();
  }
  Elements2.prototype.init = function() {
    var _this = this;
    var elementVideos = document.querySelectorAll(this.options.apply);
    if (elementVideos.length === 0) {
      return;
    }
    elementVideos.forEach(function(elementVideo) {
      elementVideo.removeAttribute("controls");
      elementVideo.addEventListener("loadedmetadata", function() {
        elementVideo.controls = false;
      });
      var elementContainer = document.createElement("div");
      var parentElement = elementVideo.parentElement;
      if (parentElement) {
        elementContainer.setAttribute("id", _this.identifiers.container);
        parentElement.insertBefore(elementContainer, elementVideo);
        elementContainer.appendChild(elementVideo);
        _this.buildButtonsTop(elementContainer);
        _this.buildButtonsMiddle(elementContainer);
        _this.buildButtonsBottom(elementContainer);
      }
    });
  };
  Elements2.prototype.buildButtonsTop = function(elementContainer) {
    var elementTop = document.createElement("div");
    elementTop.setAttribute("id", this.identifiers.buttonsTop);
    elementContainer.appendChild(elementTop);
  };
  Elements2.prototype.buildButtonsMiddle = function(elementContainer) {
    var elementMiddle = document.createElement("div");
    elementMiddle.setAttribute("id", this.identifiers.buttonsMiddle);
    elementContainer.appendChild(elementMiddle);
  };
  Elements2.prototype.buildButtonsBottom = function(elementContainer) {
    var elementBottom = document.createElement("div");
    elementBottom.setAttribute("id", this.identifiers.buttonsBottom);
    elementContainer.appendChild(elementBottom);
  };
  return Elements2;
}();
var elements_default = Elements;

// build/enums/styles.js
var styles;
(function(styles2) {
  styles2[styles2["video"] = 0] = "video";
  styles2[styles2["container"] = 1] = "container";
  styles2[styles2["buttonsTop"] = 2] = "buttonsTop";
  styles2[styles2["buttonsMiddle"] = 3] = "buttonsMiddle";
  styles2[styles2["buttonsBottom"] = 4] = "buttonsBottom";
})(styles || (styles = {}));

// build/class/io_error.js
var __extends = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var IOError = function(_super) {
  __extends(IOError2, _super);
  function IOError2(message) {
    var _this = _super.call(this, message) || this;
    console.error(message);
    _this.name = "Error";
    return _this;
  }
  return IOError2;
}(Error);
var io_error_default = IOError;

// build/class/styles.js
var Styles = function() {
  function Styles2(aspectRatio, identifiers) {
    var _this = this;
    this.applyAspectRatio = function() {
      var stylesMap = {};
      var elementContainer = document.getElementById(_this.identifiers.container);
      if (elementContainer == null)
        throw new io_error_default("Error");
      var totalWidth = elementContainer.parentElement.offsetWidth;
      var totalHeight = totalWidth * _this.aspectRatio.vertical / _this.aspectRatio.horizontal;
      var differenceHeight = totalHeight - window.innerHeight;
      if (differenceHeight > 0) {
        totalWidth = totalWidth - differenceHeight;
        totalHeight = totalHeight - differenceHeight;
      }
      stylesMap["width"] = "".concat(totalWidth, "px");
      _this.addStyles(styles.buttonsTop, _this.getStyles("#".concat(_this.identifiers.buttonsTop), stylesMap));
      _this.addStyles(styles.buttonsBottom, _this.getStyles("#".concat(_this.identifiers.buttonsBottom), stylesMap));
      stylesMap["top"] = "calc(".concat(totalHeight / 2, "px - 3rem);");
      _this.addStyles(styles.buttonsMiddle, _this.getStyles("#".concat(_this.identifiers.buttonsMiddle), stylesMap));
      delete stylesMap["top"];
      stylesMap["height"] = "".concat(totalHeight, "px");
      _this.addStyles(styles.container, _this.getStyles("#".concat(_this.identifiers.container), stylesMap));
    };
    this.containerStyle = document.head;
    this.aspectRatio = aspectRatio;
    this.identifiers = identifiers;
    this.arrayIdentifiers = [
      this.identifiers.video,
      this.identifiers.container,
      this.identifiers.buttonsTop,
      this.identifiers.buttonsMiddle,
      this.identifiers.buttonsBottom
    ];
  }
  Styles2.prototype.build = function() {
    for (var index = 0; index < this.arrayIdentifiers.length; index++) {
      var identifier = this.arrayIdentifiers[index];
      var style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.setAttribute("key", identifier);
      this.containerStyle.appendChild(style);
    }
    this.applyDefaultStyles(styles.video, this.identifiers.video);
    this.applyDefaultStyles(styles.container, "#".concat(this.identifiers.container));
    this.applyDefaultStyles(styles.buttonsTop, "#".concat(this.identifiers.buttonsTop));
    this.applyDefaultStyles(styles.buttonsMiddle, "#".concat(this.identifiers.buttonsMiddle));
    this.applyDefaultStyles(styles.buttonsBottom, "#".concat(this.identifiers.buttonsBottom));
    this.applyAspectRatio();
  };
  Styles2.prototype.rebuild = function() {
    for (var index = 0; index < this.arrayIdentifiers.length; index++) {
      var identifier = this.arrayIdentifiers[index];
      var styleElement = document.querySelector('style[key="' + identifier + '"]');
      if (styleElement == null) {
        new io_error_default('Error: style[key="' + identifier + "\"] doesn't exist!");
      }
      styleElement === null || styleElement === void 0 ? void 0 : styleElement.remove();
    }
    this.build();
  };
  Styles2.prototype.applyDefaultStyles = function(style, identifierElement) {
    var stylesMap = {};
    switch (style) {
      case styles.container:
        stylesMap["position"] = "relative";
        stylesMap["display"] = "flex";
        stylesMap["flex-direction"] = "column";
        break;
      case styles.video:
        stylesMap["position"] = "absolute";
        stylesMap["display"] = "block";
        stylesMap["width"] = "100%";
        stylesMap["height"] = "100%";
        stylesMap["z-index"] = "-99";
        stylesMap["background-color"] = "black";
        break;
      case styles.buttonsTop:
      case styles.buttonsMiddle:
      case styles.buttonsBottom:
        stylesMap["position"] = "absolute";
        stylesMap["display"] = "flex";
        stylesMap["right"] = "0";
        stylesMap["left"] = "0";
        stylesMap["z-index"] = "99";
        stylesMap["flex-direction"] = "row";
        stylesMap["justify-content"] = "center";
        stylesMap["width"] = "100%";
        if (style === styles.buttonsTop) {
          stylesMap["background-color"] = "#FF000080";
          stylesMap["top"] = "0";
          stylesMap["align-items"] = "flex-end";
          stylesMap["min-height"] = "2rem";
          stylesMap["max-height"] = "6rem";
        } else if (style === styles.buttonsMiddle) {
          stylesMap["background-color"] = "#00FF0080";
          stylesMap["align-items"] = "center";
          stylesMap["height"] = "6rem";
        } else if (style === styles.buttonsBottom) {
          stylesMap["background-color"] = "#0000FF80";
          stylesMap["bottom"] = "0";
          stylesMap["align-items"] = "flex-start";
          stylesMap["min-height"] = "2rem";
          stylesMap["max-height"] = "6rem";
        }
        break;
    }
    this.setStyles(style, this.getStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.getStyles = function(styleId, styleMap, compatibility) {
    if (compatibility === void 0) {
      compatibility = false;
    }
    var styleString;
    styleString = "".concat(styleId, " {");
    for (var key in styleMap) {
      if (styleMap.hasOwnProperty(key)) {
        if (compatibility) {
          styleString += "-moz-".concat(key, ": ").concat(styleMap[key], ";");
          styleString += "-ms-".concat(key, ": ").concat(styleMap[key], ";");
          styleString += "-o-".concat(key, ": ").concat(styleMap[key], ";");
        }
        styleString += "".concat(key, ": ").concat(styleMap[key], ";");
      }
    }
    styleString += "}";
    return styleString;
  };
  Styles2.prototype.setStyles = function(watchStyle, stringStyle) {
    var identifier = this.arrayIdentifiers[watchStyle];
    var styleElement = document.querySelector('style[key="' + identifier + '"]');
    if (styleElement == null) {
      new io_error_default('Error: style[key="' + identifier + "\"] doesn't exist!");
    }
    styleElement.innerHTML = stringStyle;
  };
  Styles2.prototype.addStyles = function(watchStyle, stringStyle) {
    var identifier = this.arrayIdentifiers[watchStyle];
    var styleElement = document.querySelector('style[key="' + identifier + '"]');
    if (styleElement == null) {
      new io_error_default('Error: style[key="' + identifier + "\"] doesn't exist!");
    }
    styleElement.innerHTML += stringStyle;
  };
  return Styles2;
}();
var styles_default = Styles;

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
      video: apply,
      container: this.utils.hash(28),
      buttonsTop: this.utils.hash(28),
      buttonsMiddle: this.utils.hash(28),
      buttonsBottom: this.utils.hash(28)
    };
    this.styles = new styles_default(this.options.aspectRatio, this.identifiers);
    this.elements = new elements_default(this.options, this.identifiers);
    this.init();
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
  WVP2.prototype.init = function() {
    this.styles.build();
  };
  return WVP2;
}();
