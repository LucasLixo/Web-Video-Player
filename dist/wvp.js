"./interfaces/options";

// build/class/controls.js
var Controls = function() {
  function Controls2(elementVideo, index, buttons) {
    this.elementVideo = elementVideo;
    this.buttons = buttons;
    elementVideo.removeAttribute("controls");
    elementVideo.addEventListener("loadedmetadata", function() {
      elementVideo.controls = false;
    });
    this.buttons.playPause.addEventListener("click", this.togglePlayPause);
    console.log("init");
  }
  Controls2.prototype.togglePlayPause = function() {
    if (this.elementVideo.paused) {
      this.elementVideo.play();
    } else {
      this.elementVideo.pause();
    }
    console.log("togglePlayPause");
  };
  return Controls2;
}();
var controls_default = Controls;

// build/class/elements.js
var Elements = function() {
  function Elements2(options, identifiers) {
    this.pathFullscreenOn = "M200-200v-193h60v133h133v60H200Zm0-367v-193h193v60H260v133h-60Zm367 367v-60h133v-133h60v193H567Zm133-367v-133H567v-60h193v193h-60Z";
    this.pathFullscreenOff = "M333-200v-133H200v-60h193v193h-60Zm234 0v-193h193v60H627v133h-60ZM200-567v-60h133v-133h60v193H200Zm367 0v-193h60v133h133v60H567Z";
    this.pathForward10 = "M360 746V534h-54v-49h104v261h-50Zm147 0q-18.7 0-31.35-12.65Q463 720.7 463 702V529q0-18.7 12.65-31.35Q488.3 485 507 485h83q18.7 0 31.35 12.65Q634 510.3 634 529v173q0 18.7-12.65 31.35Q608.7 746 590 746h-83Zm6-50h71V534h-71v162Zm-33 280q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616q0-75 28-140.5T225 361q49-49 114.5-77T480 256h21l-78-78 41-41 147 147-147 147-41-41 74-74h-17q-125.357 0-212.679 87.321Q180 490.643 180 616t87.321 212.679Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616h60q0 75-28 140.5T735 871q-49 49-114.5 77T480 976Z";
    this.pathForward30 = "M281 746v-50h121v-56h-82v-49h82v-57H281v-49h127q18.7 0 31.35 12.65Q452 510.3 452 529v173q0 18.7-12.65 31.35Q426.7 746 408 746H281Zm272 0q-18.7 0-31.35-12.65Q509 720.7 509 702V529q0-18.7 12.65-31.35Q534.3 485 553 485h83q18.7 0 31.35 12.65Q680 510.3 680 529v173q0 18.7-12.65 31.35Q654.7 746 636 746h-83Zm6-50h71V534h-71v162Zm-79 280q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616q0-75 28-140.5T225 361q49-49 114.5-77T480 256h21l-78-78 41-41 147 147-147 147-41-41 74-74h-17q-125.357 0-212.679 87.321Q180 490.643 180 616t87.321 212.679Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616h60q0 75-28 140.5T735 871q-49 49-114.5 77T480 976Z";
    this.pathReplay10 = "M480 976q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616h60q0 125 87.321 212.5Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616t-85-212.679Q610 316 485 316h-22l73 73-42 42-147-147 147-147 41 41-78 78h23q75 0 140.5 28T735 361q49 49 77 114.5T840 616q0 75-28 140.5T735 871q-49 49-114.5 77T480 976ZM360 746V534h-54v-49h104v261h-50Zm147 0q-18.7 0-31.35-12.65Q463 720.7 463 702V529q0-18.7 12.65-31.35Q488.3 485 507 485h83q18.7 0 31.35 12.65Q634 510.3 634 529v173q0 18.7-12.65 31.35Q608.7 746 590 746h-83Zm6-50h71V534h-71v162Z";
    this.pathReplay30 = "M480 976q-75 0-140.5-28T225 871q-49-49-77-114.5T120 616h60q0 125 87.321 212.5Q354.643 916 480 916t212.679-87.321Q780 741.357 780 616t-85-212.679Q610 316 485 316h-22l73 73-42 42-147-147 147-147 41 41-78 78h23q75 0 140.5 28T735 361q49 49 77 114.5T840 616q0 75-28 140.5T735 871q-49 49-114.5 77T480 976ZM281 746v-50h121v-55h-82v-50h82v-56H281v-50h127q18.7 0 31.35 12.65Q452 510.3 452 529v173q0 18.7-12.65 31.35Q426.7 746 408 746H281Zm272 0q-18.7 0-31.35-12.65Q509 720.7 509 702V529q0-18.7 12.65-31.35Q534.3 485 553 485h83q18.7 0 31.35 12.65Q680 510.3 680 529v173q0 18.7-12.65 31.35Q654.7 746 636 746h-83Zm6-50h71V535h-71v161Z";
    this.pathPause = "M370 736h60V416h-60v320Zm160 0h60V416h-60v320Zm-50 240q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z";
    this.pathPlay = "M320-200v-560l440 280-440 280Z";
    this.pathPicture = "M405-274h361v-258H405v258ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z";
    this.pathVolumeOn = "M560-131v-62q97-28 158.5-107.5T780-481q0-101-61-181T560-769v-62q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm420 48v-337q55 17 87.5 64T660-480q0 57-33 104t-87 64ZM420-648 307-540H180v120h127l113 109v-337Zm-94 168Z";
    this.pathVolumeOff = "M813-56 681-188q-28 20-60.5 34.5T553-131v-62q23-7 44.5-15.5T638-231L473-397v237L273-360H113v-240h156L49-820l43-43 764 763-43 44Zm-36-232-43-43q20-34 29.5-71.923T773-481q0-103.322-60-184.661T553-769v-62q124 28 202 125.5T833-481q0 51-14 100t-42 93ZM643-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T643-422ZM473-592 369-696l104-104v208Zm-60 286v-150l-84-84H173v120h126l114 114Zm-42-192Z";
    this.options = options;
    this.identifiers = identifiers;
    this.init();
  }
  Elements2.prototype.init = function() {
    var elementVideos = document.querySelectorAll(this.options.apply);
    if (elementVideos.length === 0) {
      return;
    }
    for (var index = 0; index < elementVideos.length; index++) {
      var elementVideo = elementVideos[index];
      var elementContainer = document.createElement("div");
      var parentElement = elementVideo.parentElement;
      if (parentElement) {
        elementContainer.setAttribute("id", this.identifiers.container);
        parentElement.insertBefore(elementContainer, elementVideo);
        elementContainer.appendChild(elementVideo);
        this.buildTop(elementContainer);
        this.buildMiddle(elementContainer, index);
        this.buildBottom(elementContainer);
      }
      var buttons = {
        playPause: document.querySelector('button[key="' + "".concat(this.identifiers.middle, "__").concat(index) + '"]')
      };
      new controls_default(elementVideo, index, buttons);
    }
  };
  Elements2.prototype.buildTop = function(elementContainer) {
    var elementTop = document.createElement("div");
    elementTop.setAttribute("id", this.identifiers.top);
    elementContainer.appendChild(elementTop);
  };
  Elements2.prototype.buildMiddle = function(elementContainer, index) {
    var elementMiddle = document.createElement("button");
    elementMiddle.setAttribute("id", this.identifiers.middle);
    elementMiddle.setAttribute("key", "".concat(this.identifiers.middle, "__").concat(index));
    elementContainer.appendChild(elementMiddle);
    elementMiddle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" id="'.concat(this.identifiers.icons, '"><path d="').concat(this.pathPlay, '" /></svg>');
  };
  Elements2.prototype.buildBottom = function(elementContainer) {
    var elementBottom = document.createElement("div");
    elementBottom.setAttribute("id", this.identifiers.bottom);
    elementContainer.appendChild(elementBottom);
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
      this.identifiers.icons
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
      "background-color": "black"
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
      "justify-content": "center",
      "background-color": "#FF000080"
    };
    this.setStyles(styles.top, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyMiddleStyles = function(identifierElement) {
    var stylesMap = {
      "position": "absolute",
      "display": "block",
      "width": "4rem",
      "height": "4rem",
      "top": "50%",
      "left": "50%",
      "z-index": "99",
      "background": this.options.colorActive,
      "color": "inherit",
      "border": "none",
      "padding": "0",
      "font": "inherit",
      "cursor": "pointer",
      "outline": "inherit",
      "touch-action": "manipulation",
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
      "justify-content": "center",
      "background-color": "#0000FF80"
    };
    this.setStyles(styles.bottom, this.parseStyles(identifierElement, stylesMap));
  };
  Styles2.prototype.applyIconsStyles = function(identifierElement) {
    var stylesMap = {
      "width": "3rem",
      "height": "3rem",
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
    var _a, _b, _c, _d;
    if (options == void 0) {
      options = {};
    }
    this.options = {
      apply: apply,
      colorInactive: (_a = options["colorInactive"]) !== null && _a !== void 0 ? _a : "#FFFFFF",
      colorActive: (_b = options["colorActive"]) !== null && _b !== void 0 ? _b : "#007AFF",
      autoplay: (_c = options["autoplay"]) !== null && _c !== void 0 ? _c : true,
      muted: (_d = options["muted"]) !== null && _d !== void 0 ? _d : true
    };
    this.identifiers = {
      all: "wvp_all",
      video: apply,
      container: "wvp__container",
      top: "wvp__top",
      middle: "wvp__middle",
      bottom: "wvp__bottom",
      icons: "wvp__icon"
    };
    this.styles = new styles_default(this.options, this.identifiers);
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
