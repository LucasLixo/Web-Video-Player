// ==================================================
export default interface intActionsElements {
    // container: HTMLDivElement,
    video: HTMLVideoElement,
    id: {
        container: HTMLElement,
        top: HTMLElement,
        middle: HTMLElement,
        bottom: HTMLElement,
    },
    actions: {
        playPause: NodeListOf<HTMLButtonElement>,
        fullscreen: HTMLButtonElement,
        pictureInPicture: HTMLButtonElement,
        volume: HTMLButtonElement,
        rangerVolumeContainer: HTMLDivElement,
        rangerVolumeInput: HTMLInputElement,
        rangerVolumeProguess: HTMLDivElement,
        durationTime: HTMLElement,
        currentTime: HTMLElement,
        rangerProguessContainer: HTMLDivElement,
        rangerProguessInput: HTMLInputElement,
        rangerProguessProguess: HTMLDivElement,
    },
    svg: {
        fullscreen: SVGPathElement | null,
        playPause: SVGPathElement | null,
        pictureInPicture: SVGPathElement | null,
        volume: SVGPathElement | null,
    },
}