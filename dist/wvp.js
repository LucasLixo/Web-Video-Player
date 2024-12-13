"./interfaces/options";

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

// build/class/controls.js
var Controls = function() {
  function Controls2(elementVideo, options) {
    this.elementVideo = elementVideo;
    this.buttons = options.buttons;
    this.pathIcons = options.pathIcons;
    this.constrols = {
      isPlaying: options.autoplay,
      volume: options.muted ? 0 : 70
    };
    this.elementVideo.removeAttribute("controls");
    this.elementVideo.addEventListener("loadedmetadata", function() {
      elementVideo.controls = false;
    });
    console.log("this.togglePlayPause();");
    this.togglePlayPause();
  }
  Controls2.prototype.togglePlayPause = function() {
    var _this = this;
    var buttonPlayPause = document.querySelector('button[key="' + "".concat(this.buttons.playPause) + '"]');
    var svgPlayPause = buttonPlayPause.querySelector("svg > path");
    var thisEvent = function(videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        _this.constrols.isPlaying = true;
        svgPlayPause.setAttribute("d", _this.pathIcons.pause);
      } else {
        videoElement.pause();
        _this.constrols.isPlaying = false;
        svgPlayPause.setAttribute("d", _this.pathIcons.play);
      }
    };
    this.elementVideo.addEventListener("click", function(event) {
      thisEvent(_this.elementVideo);
    });
    buttonPlayPause.addEventListener("click", function(event) {
      thisEvent(_this.elementVideo);
    });
  };
  return Controls2;
}();
var controls_default = Controls;

// build/class/elements.js
var Elements = function() {
  function Elements2(options, identifiers, buttons) {
    this.options = options;
    this.identifiers = identifiers;
    this.buttons = buttons;
    this.iconsPath = {
      pause: "M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z",
      play: "M320-200v-560l440 280-440 280Z"
    };
  }
  Elements2.prototype.build = function() {
    var _this = this;
    var elementVideos = document.querySelectorAll(this.options.apply);
    if (elementVideos.length === 0) {
      return;
    }
    elementVideos.forEach(function(elementVideo) {
      var elementContainer = document.createElement("div");
      var parentElement = elementVideo.parentElement;
      if (parentElement == null) {
        new io_error_default("Error parentElement is null");
      }
      elementContainer.setAttribute("id", _this.identifiers.container);
      parentElement.insertBefore(elementContainer, elementVideo);
      elementContainer.appendChild(elementVideo);
      _this.buildTop(elementContainer);
      _this.buildMiddle(elementContainer);
      _this.buildBottom(elementContainer);
      try {
        new controls_default(elementVideo, { buttons: _this.buttons, pathIcons: _this.iconsPath, autoplay: _this.options.autoplay, muted: _this.options.muted });
      } catch (error) {
        new io_error_default("Error build Controls: ".concat(error));
      }
    });
  };
  Elements2.prototype.buildTop = function(elementContainer) {
    var elementTop = document.createElement("div");
    elementTop.setAttribute("id", this.identifiers.top);
    elementContainer.appendChild(elementTop);
    if (this.options.top != null) {
      elementTop.innerHTML = this.options.top;
    }
  };
  Elements2.prototype.buildMiddle = function(elementContainer) {
    var elementMiddle = document.createElement("button");
    elementMiddle.setAttribute("id", this.identifiers.middle);
    elementMiddle.setAttribute("class", this.identifiers.buttons);
    elementMiddle.setAttribute("key", this.buttons.playPause);
    elementContainer.appendChild(elementMiddle);
    elementMiddle.innerHTML = this.buildIcon(this.iconsPath.play, "2rem");
  };
  Elements2.prototype.buildBottom = function(elementContainer) {
    var elementBottom = document.createElement("div");
    elementBottom.setAttribute("id", this.identifiers.bottom);
    elementContainer.appendChild(elementBottom);
  };
  Elements2.prototype.buildIcon = function(pathIcon, size) {
    var icon = '<svg xmlns="http://www.w3.org/2000/svg" height="'.concat(size, '" viewBox="0 -960 960 960" width="').concat(size, '" id="').concat(this.identifiers.icons, '">');
    icon += '<path d="'.concat(pathIcon, '" />');
    icon += "</svg>";
    return icon;
  };
  return Elements2;
}();
var elements_default = Elements;

// build/enums/styles.js
var styles;
(function(styles2) {
  styles2[styles2["all"] = 0] = "all";
  styles2[styles2["video"] = 1] = "video";
  styles2[styles2["container"] = 2] = "container";
  styles2[styles2["top"] = 3] = "top";
  styles2[styles2["middle"] = 4] = "middle";
  styles2[styles2["bottom"] = 5] = "bottom";
  styles2[styles2["icons"] = 6] = "icons";
  styles2[styles2["buttons"] = 7] = "buttons";
})(styles || (styles = {}));

// build/class/styles.js
var Styles = function() {
  function Styles2(options, identifiers) {
    this.containerStyle = document.head;
    this.identifiers = identifiers;
    this.options = options;
    this.arrayIdentifiers = [
      this.identifiers.all,
      this.identifiers.video,
      this.identifiers.container,
      this.identifiers.top,
      this.identifiers.middle,
      this.identifiers.bottom,
      this.identifiers.icons,
      this.identifiers.buttons
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
    this.applyAllStyles("".concat(this.identifiers.video, ", #").concat(this.identifiers.container, ", #").concat(this.identifiers.top, ", #").concat(this.identifiers.middle, ", #").concat(this.identifiers.bottom));
    this.applyVideoStyles(this.identifiers.video);
    this.applyContainerStyles("#".concat(this.identifiers.container));
    this.applyTopStyles("#".concat(this.identifiers.top));
    this.applyMiddleStyles("#".concat(this.identifiers.middle));
    this.applyBottomStyles("#".concat(this.identifiers.bottom));
    this.applyIconsStyles("#".concat(this.identifiers.icons));
    this.applyButtonStyles(".".concat(this.identifiers.buttons));
  };
  Styles2.prototype.applyAllStyles = function(identifierElement) {
    var stylesMap = {
      "margin": "0",
      "padding": "0",
      "box-sizing": "inherit",
      "text-shadow": "none",
      "direction": "ltr"
    };
    this.setStyles(styles.all, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyVideoStyles = function(identifierElement) {
    var stylesMap = {
      "display": "block",
      "width": "100%",
      "height": "100%",
      "z-index": "-99",
      "background-color": this.options.backgroundColor
    };
    this.setStyles(styles.video, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyContainerStyles = function(identifierElement) {
    var stylesMap = {
      "position": "relative",
      "display": "block",
      "max-width": "100%",
      "min-width": "240px",
      "height": "fit-content"
    };
    this.setStyles(styles.container, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyTopStyles = function(identifierElement) {
    var stylesMap = {
      "position": "absolute",
      "display": "flex",
      "width": "100%",
      "height": "fit-content",
      "right": "0",
      "left": "0",
      "top": "0",
      "z-index": "99",
      "flex-direction": "row",
      "justify-content": "center"
    };
    this.setStyles(styles.top, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyMiddleStyles = function(identifierElement) {
    var stylesMap = {
      "position": "absolute",
      "width": "3rem",
      "height": "3rem",
      "top": "50%",
      "left": "50%",
      "z-index": "99",
      "transform": "translate(-50%, -50%)",
      "background": this.options.colorActive,
      "border-radius": "100%"
    };
    this.setStyles(styles.middle, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyBottomStyles = function(identifierElement) {
    var stylesMap = {
      "position": "absolute",
      "display": "flex",
      "width": "100%",
      "height": "fit-content",
      "right": "0",
      "left": "0",
      "bottom": "0",
      "z-index": "99",
      "flex-direction": "row",
      "justify-content": "center"
    };
    this.setStyles(styles.bottom, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyButtonStyles = function(identifierElement) {
    var stylesMap = {
      "display": "block",
      "color": "inherit",
      "border": "none",
      "padding": "0",
      "margin": "0",
      "font": "inherit",
      "cursor": "pointer",
      "outline": "inherit",
      "touch-action": "manipulation",
      "flex-shrink": "0"
    };
    this.setStyles(styles.buttons, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyIconsStyles = function(identifierElement) {
    var stylesMap = {
      "display": "block",
      "margin": "auto",
      "fill": this.options.colorInactive
    };
    this.setStyles(styles.icons, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.parseStyles = function(styleId, styleMap, compatibility) {
    if (compatibility === void 0) {
      compatibility = true;
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
    var _a, _b, _c, _d, _e, _f;
    if (options == void 0) {
      options = {};
    }
    this.options = {
      apply: apply,
      backgroundColor: (_a = options["backgroundColor"]) !== null && _a !== void 0 ? _a : "transparent",
      colorInactive: (_b = options["colorInactive"]) !== null && _b !== void 0 ? _b : "#FFFFFF",
      colorActive: (_c = options["colorActive"]) !== null && _c !== void 0 ? _c : "#007AFF",
      autoplay: (_d = options["autoplay"]) !== null && _d !== void 0 ? _d : true,
      muted: (_e = options["muted"]) !== null && _e !== void 0 ? _e : true,
      top: (_f = options["top"]) !== null && _f !== void 0 ? _f : null
    };
    this.identifiers = {
      all: "wvp_all",
      video: apply,
      container: "wvp__container",
      top: "wvp__top",
      middle: "wvp__middle",
      bottom: "wvp__bottom",
      icons: "wvp__icons",
      buttons: "wvp__buttons"
    };
    this.buttons = {
      playPause: "wvp__button__play_pause"
    };
    this.styles = new styles_default(this.options, this.identifiers);
    this.elements = new elements_default(this.options, this.identifiers, this.buttons);
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
    this.elements.build();
  };
  return WVP2;
}();
