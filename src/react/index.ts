import { OptionsRippleType } from "../options";
import { createEffectRipple } from "../rippleCore";

const reactElementsMap = new WeakMap<HTMLElement, Partial<OptionsRippleType>>();

function bindRippleEffect(el: HTMLElement) {
    el.addEventListener("pointerdown", (event: PointerEvent) => {
        createEffectRipple(event, el, reactElementsMap.get(el));
    });
}

/**
 * The React hook for create ripple effect.
 * @example
 *   import { useRipple } from "@chaocore/ripple";
 *
 *   function MyComponent() {
 *       const ripple = useRipple(options);
 *
 *       return <div ref={ripple} className="btn">Click Here</div>
 *   }
 */
export function useRipple(options: Partial<OptionsRippleType> = {}) {
    return (el: HTMLElement | null) => {
        if (!el) return;

        if (!reactElementsMap.has(el)) bindRippleEffect(el);

        reactElementsMap.set(el, options);
    };
}
