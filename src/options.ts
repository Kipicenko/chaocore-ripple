export type OptionsRippleType = {
    /**
     * `Defines the color of the ripple.`
     *
     * @default
     * 'currentColor'
     */
    color: string;
    /**
     * `Any valid CSS <transition-timing-function>`
     *
     * @default
     * 'ease-out'
     */
    easing: string;
    /**
     * `The duration of the ripple in milliseconds.`
     *
     * @default
     * 400ms
     */
    duration: number;
    /**
     * `The dissolve duration of the ripple in milliseconds.
     * Starts after the end of the main duration.`
     *
     * @default
     * 300ms
     */
    dissolveDuration: number;
    /**
     * `The animation delay in milliseconds during which the animation maybe canceled
     * if the current pointer action is interrupted for some reason and pointer events are no longer generated.
     * Read about the pointercancel event`
     *
     * @default
     * 75ms
     */
    delay: number;
    /**
     * `The opacity of the ripple at the beginning of the animation.`
     *
     * @default
     * 0.2
     */
    initialOpacity: number;
    /**
     * `The opacity of the ripple at the end of the animation.`
     *
     * @default
     * 0.1
     */
    finalOpacity: number;
    /**
     * `Don't display a ripple effect if the element has the disable attribute.`
     *
     * @default
     * true
     */
    considerDisabledAttr: boolean;
    /**
     * `Don't display a ripple effect.`
     *
     * @default
     * false
     */
    turnOff: boolean;
};

export const defaultOptions: OptionsRippleType = {
    color: "currentColor",
    easing: "ease-out",
    duration: 400,
    dissolveDuration: 300,
    delay: 75,
    initialOpacity: 0.2,
    finalOpacity: 0.1,
    considerDisabledAttr: true,
    turnOff: false,
};
