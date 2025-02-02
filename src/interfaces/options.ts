// ==================================================
export default interface intOptions {
    apply: string,
    settings: {
        autoplay: boolean,
        muted: boolean,
    },
    show: {
        titleTop: boolean,
        playPause: boolean,
        playPauseCenter: boolean,
        fullscreen: boolean,
        pictureInPicture: boolean,
        volume: boolean,
        rangerVolume: boolean,
        durationTime: boolean,
        currentTime: boolean,
        rangerProguess: boolean,
    },
    style: {
        titleTag: string | null,
        backgroundColor: string,
        colorInactive: string,
        colorActive: string,
        shadow: boolean,
    },
}