export var reloaders;
(function (reloaders) {
    reloaders[reloaders["resetStyle"] = 0] = "resetStyle";
    reloaders[reloaders["styles"] = 1] = "styles";
    reloaders[reloaders["aspectRatio"] = 2] = "aspectRatio";
    reloaders[reloaders["resetVideo"] = 3] = "resetVideo";
    reloaders[reloaders["video"] = 4] = "video";
})(reloaders || (reloaders = {}));
